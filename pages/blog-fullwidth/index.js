import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogList from '../../components/BlogList/BlogList'; 

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
// (FIXED for Flat Strapi Data & Serialization)
// -----------------------------------------------------------
export async function getStaticProps() {
    
    if (!STRAPI_BASE_URL || (!STRAPI_BASE_URL.startsWith('http://') && !STRAPI_BASE_URL.startsWith('https://'))) {
        console.error("FATAL ERROR: STRAPI_BASE_URL environment variable is missing or does not include http:// or https:// protocol.");
        return { props: { posts: [], pagination: {} }, revalidate: 1 };
    }

    try {
        const apiPath = `/api/news-stories?populate=Image&sort[0]=PublishedDate:desc`;
        const fetchUrl = `${STRAPI_BASE_URL}${apiPath}`;
        
        console.log(`[STRAPI FETCH] Attempting fetch from: ${fetchUrl}`); 
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
                // 🛑 FIX 1: Use the item itself if 'attributes' is missing (to handle flat data structure).
                const attributes = item.attributes ? item.attributes : item;

                // New, more general guard check
                if (!item || !item.id) { 
                    console.warn(`[DATA WARNING] Skipping malformed Strapi item: missing ID.`);
                    return null;
                }
                
                // Debug line
                console.log(`[ITEM CHECK] ID: ${item?.id}, Title Present: ${!!attributes.Title}`);

                // Image URL Construction
                const imageRelation = attributes.Image;
                const imageAttributes = imageRelation?.data?.attributes;
                
                let imageUrl = null;
                if (imageAttributes && imageAttributes.url) {
                    const relativeOrFullUrl = imageAttributes.url;
                    
                    if (relativeOrFullUrl.startsWith('/')) {
                        // Ensure STRAPI_BASE_URL doesn't end in / and relativeOrFullUrl starts with /
                        imageUrl = `${STRAPI_BASE_URL.replace(/\/$/, '')}${relativeOrFullUrl}`;
                    } else {
                        imageUrl = relativeOrFullUrl; 
                    }
                }

                // 🛑 FIX 2: Use nullish coalescing (?? null) to ensure no property is 'undefined', 
                // preventing the Next.js serialization error.
                return {
                    id: item.id,
                    Title: attributes.Title ?? null,
                    PublishedDate: attributes.PublishedDate ?? null, 
                    Author: attributes.Author ?? null,
                    Content: attributes.Content ?? null,
                    Slug: attributes.Slug ?? null,
                    Description: attributes.Description ?? null, // THIS IS THE KEY FIX for the 'undefined' error
                    PhotoCredit: attributes.PhotoCredit ?? null,
                    Image: {
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
            revalidate: 60, 
        };

    } catch (error) {
        console.error("Critical error fetching and processing news stories list:", error.message);
        return { 
            props: { posts: [], pagination: {} },
            revalidate: 60,
        };
    }
}