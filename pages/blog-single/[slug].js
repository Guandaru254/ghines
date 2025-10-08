import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import NewHeader from '../../components/NewHeader/newheader.js';
import Footer from '../../components/footer/Footer';
import BlogSingle from '../../components/BlogDetails/BlogSingle';

// 1. CRITICAL: Reference the secure environment variablea
const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL; 

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
    try {
        // Fetch only the Slugs field for efficiency
        const res = await fetch(`${STRAPI_BASE_URL}/api/news-stories?fields[0]=Slug`);
        const posts = await res.json();

        const paths = posts.data.map((post) => ({
            params: { slug: post.attributes.Slug }, 
        }));

        return { 
            paths, 
            fallback: true // Allows new posts to be generated via ISR
        };
    } catch (error) {
        console.error("Error fetching static paths:", error);
        return { paths: [], fallback: 'blocking' }; 
    }
}

// -----------------------------------------------------------
// getStaticProps: Fetches the data for a specific article
// -----------------------------------------------------------
export async function getStaticProps({ params }) {
    const { slug } = params;
    
    try {
        // Fetch the specific post, filtering by slug and populating the image
        const res = await fetch(
            `${STRAPI_BASE_URL}/api/news-stories?filters[Slug][$eq]=${slug}&populate=*`
        );
        const data = await res.json();

        if (!data.data || data.data.length === 0) {
            return { notFound: true };
        }

        return {
            props: {
                blog: data.data[0], // Pass the full Strapi item
            },
            revalidate: 60, // Re-generate the page every 60 seconds (ISR)
        };

    } catch (error) {
        console.error(`Error fetching post for slug ${slug}:`, error);
        return { notFound: true };
    }
}
