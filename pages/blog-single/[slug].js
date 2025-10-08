import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import NewHeader from '../../components/NewHeader/newheader.js';
import Footer from '../../components/footer/Footer';
import BlogSingle from '../../components/BlogDetails/BlogSingle';

// 1. CRITICAL: Reference the secure environment variable
const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL; 

// Utility function to ensure the URL has a protocol
const getFetchBaseUrl = (baseUrl) => {
    if (!baseUrl) return null;
    // Prepend 'https:' if the URL starts with '//' (protocol-less)
    return baseUrl.startsWith('//') ? `https:${baseUrl}` : baseUrl;
};

// -----------------------------------------------------------
// MAIN COMPONENT: Receives 'blog' data as a prop
// -----------------------------------------------------------
const BlogDetails = ({ blog }) => {
    // Show a loading state if Next.js is building the page on-the-fly (fallback: true)
    if (!blog) {
        return <Fragment><NewHeader /><div style={{textAlign: 'center', padding: '100px'}}>Loading article...</div><Footer /><Scrollbar /></Fragment>;
    }
    
    // Strapi data is nested under 'attributes'
    const postAttributes = blog.attributes; 

    return (
        <Fragment>
            <NewHeader />
            {/* Display the dynamic Title from Strapi */}
            <PageTitle pageTitle={postAttributes.Title} pagesub={'News & Stories'} />
            
            {/* Pass the post data to the rendering component */}
            <BlogSingle post={postAttributes} />
            
            <Footer />
            <Scrollbar />
        </Fragment>
    );
};
export default BlogDetails;


// -----------------------------------------------------------
// getStaticPaths: Defines all article URLs for Next.js to pre-build
// -----------------------------------------------------------
export async function getStaticPaths() {
    const fetchBaseUrl = getFetchBaseUrl(STRAPI_BASE_URL);

    try {
        // Check for base URL validity
        if (!fetchBaseUrl) {
            console.error("STRAPI_BASE_URL is missing or invalid in getStaticPaths.");
            return { paths: [], fallback: 'blocking' }; 
        }
        
        // Construct the full, correct URL
        const fetchUrl = `${fetchBaseUrl}/api/news-stories?fields[0]=Slug`;
        
        console.log(`[getStaticPaths] Fetching slugs from: ${fetchUrl}`);

        const res = await fetch(fetchUrl);
        
        if (!res.ok) {
             const errorText = await res.text();
             console.error(`[getStaticPaths ERROR] Status: ${res.status} (${res.statusText}). Response: ${errorText.substring(0, 100)}...`);
             throw new Error(`API returned status: ${res.status}`);
        }

        const posts = await res.json();
        
        // Ensure posts.data exists before mapping
        const paths = (posts.data || []).map((post) => ({
            params: { slug: post.attributes.Slug }, 
        }));

        console.log(`[getStaticPaths] Found ${paths.length} paths.`);

        return { 
            paths, 
            fallback: 'blocking' // Use 'blocking' for robust ISR handling on dynamic pages
        };
    } catch (error) {
        console.error("Critical error in getStaticPaths:", error.message);
        return { paths: [], fallback: 'blocking' }; 
    }
}

// -----------------------------------------------------------
// getStaticProps: Fetches the data for a specific article
// -----------------------------------------------------------
export async function getStaticProps({ params }) {
    const { slug } = params;
    const fetchBaseUrl = getFetchBaseUrl(STRAPI_BASE_URL);
    
    try {
        // Check for base URL validity
        if (!fetchBaseUrl) {
            console.error("STRAPI_BASE_URL is missing or invalid in getStaticProps.");
            return { notFound: true };
        }
        
        // Construct the full, correct URL
        const fetchUrl = `${fetchBaseUrl}/api/news-stories?filters[Slug][$eq]=${slug}&populate=*`;
        
        console.log(`[getStaticProps] Fetching post for slug ${slug} from: ${fetchUrl}`);

        const res = await fetch(fetchUrl);
        const data = await res.json();

        if (!data.data || data.data.length === 0) {
            console.warn(`Post not found for slug: ${slug}`);
            return { notFound: true };
        }

        return {
            props: {
                blog: data.data[0], // Pass the full Strapi item
            },
            revalidate: 60, // Re-generate the page every 60 seconds (ISR)
        };

    } catch (error) {
        console.error(`Critical error fetching post for slug ${slug}:`, error.message);
        return { notFound: true };
    }
}
