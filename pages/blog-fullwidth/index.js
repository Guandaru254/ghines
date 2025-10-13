import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogList from '../../components/BlogList/BlogList'; 
import fetch from 'node-fetch'; // Required for fetch in getStaticProps

// NOTE: Vercel documentation strongly recommends including the protocol for external APIs.
// Ensure your .env.local has: NEXT_PUBLIC_STRAPI_API_URL="https://light-light-5ba7f2d7f7.strapiapp.com"
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
    
    // Protocol check for robustness
    if (!STRAPI_BASE_URL || (!STRAPI_BASE_URL.startsWith('http://') && !STRAPI_BASE_URL.startsWith('https://') && !STRAPI_BASE_URL.startsWith('//'))) {
        console.error("FATAL ERROR: STRAPI_BASE_URL is missing or lacks a valid protocol.");
        return { props: { posts: [], pagination: {} }, revalidate: 1 };
    }

    try {
        const apiPath = `/api/news-stories?populate=Image&sort[0]=PublishedDate:desc`;
        // Ensure a protocol is used for the fetch call if the variable is protocol-less
        const fetchBaseUrl = STRAPI_BASE_URL.startsWith('//') ? `https:${STRAPI_BASE_URL}` : STRAPI_BASE_URL;
        // Clean the base URL once to use it safely for both API and assets
        const cleanedBaseUrl = fetchBaseUrl.replace(/\/$/, '');
        const fetchUrl = `${cleanedBaseUrl}${apiPath}`;
        
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
        
        const formattedPosts = rawPosts
            .map(item => {
                const attributes = item.attributes ? item.attributes : item;

                if (!item || !item.id) { 
                    console.warn(`[DATA WARNING] Skipping malformed Strapi item: missing ID.`);
                    return null;
                }

                // --- IMAGE URL CONSTRUCTION (FINAL FIX) ---
                const imageRelation = attributes.Image;
                const imageAttributes = imageRelation?.data?.attributes;
                
                let imageUrl = null;
                if (imageAttributes) {
                    
                    // 1. Get the base instance ID (e.g., light-light-5ba7f2d7f7)
                    //    We remove 'https://' and everything after the first dot
                    const urlParts = cleanedBaseUrl.replace(/https?:\/\//, '').split('.');
                    const baseInstanceId = urlParts.length > 0 ? urlParts[0] : null;

                    // 2. Select the desired image format (prioritize large/medium/small)
                    const imageFormat = imageAttributes.formats?.large || imageAttributes.formats?.medium || imageAttributes.formats?.small;
                    
                    let imageFileName = null;
                    if (imageFormat) {
                        // CRITICAL: Use the 'name' field which includes the size prefix (e.g., 'large_A_...webp'), 
                        // as this is what the Strapi Cloud media server expects.
                        imageFileName = imageFormat.name || imageFormat.hash + imageFormat.ext; 
                        
                    } else if (imageAttributes.url) {
                        // Fallback to the original file path/name
                        imageFileName = imageAttributes.url.split('/').pop();
                    }
                    
                    // 3. Construct the FINAL, CORRECT, SECURE URL: https://[instance].media.strapiapp.com/[filename]
                    //    This fixes the 404 error by using the dedicated media subdomain.
                    if (baseInstanceId && imageFileName) {
                        imageUrl = `https://${baseInstanceId}.media.strapiapp.com/${imageFileName}`;
                    }

                    console.log(`[IMAGE URL] Final URL: ${imageUrl}`);
                }
                // --- END IMAGE URL CONSTRUCTION ---

                // Use nullish coalescing (?? null) to ensure no property is 'undefined'
                return {
                    id: item.id,
                    Title: attributes.Title ?? null,
                    PublishedDate: attributes.PublishedDate ?? null, 
                    Author: attributes.Author ?? null,
                    Content: attributes.Content ?? null,
                    Slug: attributes.Slug ?? null,
                    Description: attributes.Description ?? null, 
                    PhotoCredit: attributes.PhotoCredit ?? null,
                    Image: {
                        url: imageUrl ?? null, // Pass the full, correctly constructed URL
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