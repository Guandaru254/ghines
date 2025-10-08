import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogList from '../../components/BlogList/BlogList'; 
import fetch from 'node-fetch'; // Required for fetch in getStaticProps

// NOTE: Vercel documentation strongly recommends including the protocol for external APIs.
// Setting it to 'https://' on Vercel is the most robust way to solve the ENOTFOUND issue.
const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL; 

// -----------------------------------------------------------
// MAIN COMPONENT: Receives 'posts' (pre-fetched and cleaned)
// -----------------------------------------------------------
const BlogPageFullwidth = ({ posts, pagination }) => {
    // Renders the fallback message if no posts are found
    if (!posts || posts.length === 0) {
        return (
            <Fragment>
                <PageTitle pageTitle={'News & Stories'} pagesub={'Home'} />
                <div style={{textAlign: 'center', padding: '100px', minHeight: '400px'}}>
                    <h2 className="text-2xl font-bold text-gray-700">No articles found.</h2>
                    <p className="text-gray-500 mt-2">
                        Please check your console for fetch errors, verify the Strapi API URL, 
                        and ensure content is **Published** in Strapi.
                    </p>
                </div>
                <Scrollbar />
            </Fragment>
        );
    }

    // Renders the BlogList component with posts
    return (
        <Fragment>
            <PageTitle pageTitle={'News & Stories'} pagesub={'Home'} />
            <BlogList posts={posts} pagination={pagination} />
            <Scrollbar />
        </Fragment>
    );
};
export default BlogPageFullwidth;


// -----------------------------------------------------------
// getStaticProps: Fetches and TRANSFORMS the list of articles
// -----------------------------------------------------------
export async function getStaticProps() {
    
    // Add back protocol check for robustness, even if Vercel is set to //
    if (!STRAPI_BASE_URL || (!STRAPI_BASE_URL.startsWith('http://') && !STRAPI_BASE_URL.startsWith('https://') && !STRAPI_BASE_URL.startsWith('//'))) {
        console.error("FATAL ERROR: STRAPI_BASE_URL is missing or lacks a valid protocol.");
        // We continue to allow build to pass with no posts if this happens
        return { props: { posts: [], pagination: {} }, revalidate: 1 };
    }

    try {
        const apiPath = `/api/news-stories?populate=Image&sort[0]=PublishedDate:desc`;
        // Ensure a protocol is used for the fetch call if the variable is protocol-less
        const fetchBaseUrl = STRAPI_BASE_URL.startsWith('//') ? `https:${STRAPI_BASE_URL}` : STRAPI_BASE_URL;
        const fetchUrl = `${fetchBaseUrl}${apiPath}`;
        
        console.log(`[STRAPI FETCH] Attempting fetch from: ${fetchUrl}`); 
        // Use node-fetch for server-side fetching (necessary in older Next.js versions)
        const res = await fetch(fetchUrl); 
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error(`[STRAPI FETCH ERROR] Status: ${res.status} (${res.statusText}). Response body (for debug): ${errorText.substring(0, 200)}...`);
            throw new Error(`Strapi API returned status: ${res.status}`);
        }
        
        const data = await res.json();
        
        console.log("--- RAW STRAPI RESPONSE DATA START (DEBUG) ---");
        const rawPostDataSnippet = JSON.stringify(data).substring(0, 500) + '...';
        console.log(rawPostDataSnippet); 
        
        const rawPosts = data.data || [];
        
        console.log("--- ARRAY BEING MAPPED (rawPosts.length) ---", rawPosts.length);

        const formattedPosts = rawPosts
            .map(item => {
                // Use 'attributes' or the item itself (for potential custom flat formats)
                const attributes = item.attributes ? item.attributes : item;

                if (!item || !item.id) { 
                    console.warn(`[DATA WARNING] Skipping malformed Strapi item: missing ID.`);
                    return null;
                }
                
                console.log(`[ITEM CHECK] ID: ${item?.id}, Title Present: ${!!attributes.Title}`);

                // Image URL Construction (handles Strapi deep population structure)
                const imageRelation = attributes.Image;
                const imageAttributes = imageRelation?.data?.attributes;
                
                let imageUrl = null;
                if (imageAttributes && imageAttributes.url) {
                    const relativeOrFullUrl = imageAttributes.url;
                    
                    if (relativeOrFullUrl.startsWith('/')) {
                        // Prepend the base URL (which includes the protocol)
                        imageUrl = `${fetchBaseUrl.replace(/\/$/, '')}${relativeOrFullUrl}`;
                    } else {
                        imageUrl = relativeOrFullUrl; 
                    }
                }

                // 🛑 FIX 2: Use nullish coalescing (?? null) to ensure no property is 'undefined', 
                // solving the 'Error serializing' issue.
                return {
                    id: item.id,
                    Title: attributes.Title ?? null,
                    PublishedDate: attributes.PublishedDate ?? null, 
                    Author: attributes.Author ?? null,
                    Content: attributes.Content ?? null,
                    Slug: attributes.Slug ?? null,
                    // This is the field that was causing the serialization failure
                    Description: attributes.Description ?? null, 
                    PhotoCredit: attributes.PhotoCredit ?? null,
                    Image: {
                        // Pass the full, correctly constructed URL
                        url: imageUrl ?? null, 
                    },
                };
            })
            .filter(post => post !== null); 

        const pagination = data.meta?.pagination || {};
        
        console.log(`[SUCCESS] Successfully processed ${formattedPosts.length} posts.`);

        return {
            props: {
                posts: formattedPosts, 
                pagination: pagination,
            },
            // Use Incremental Static Regeneration (ISR) to re-fetch every 60 seconds
            revalidate: 60, 
        };

    } catch (error) {
        console.error("Critical error fetching and processing news stories list:", error.message);
        // Return an empty array on failure so the component displays the friendly error message
        return { 
            props: { posts: [], pagination: {} },
            revalidate: 60,
        };
    }
}