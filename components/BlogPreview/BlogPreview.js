import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment'; 

// Get the base URL from the environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const BlogPreview = () => {
    const [blogData, setBlogData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogPreviewData = async () => {
            if (!API_BASE_URL) {
                console.error("CONFIGURATION ERROR: NEXT_PUBLIC_STRAPI_API_URL is not defined in environment variables.");
                setIsLoading(false);
                return;
            }

            // Clean up the base URL by removing trailing slash and ensuring the protocol is present.
            const cleanBaseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

            // Define the specific query for the top 3 posts
            // 💡 CRITICAL FIX 10: Using the confirmed correct, case-sensitive field names ('Author' and 'Image')
            // and using deep population for 'Image' for robustness.
            const queryPath = '/api/news-stories?sort[0]=publishedAt:desc&pagination[limit]=3&populate[Image][fields][0]=url&populate[Image][fields][1]=alternativeText&populate[Author]';
            
            // Construct the final URL
            const url = `${cleanBaseUrl}${queryPath}`;

            console.log("Attempting to fetch blog preview from:", url);
        
            try {
                const res = await fetch(url);
        
                if (!res.ok) {
                    // Log the full failing URL to aid debugging on the server side
                    console.error(`API FETCH ERROR: Status ${res.status} ${res.statusText} for URL: ${url}`);
                    
                    if (res.status === 400) {
                        console.error("400 ERROR: Population failed. The field names 'Author' and 'Image' are confirmed by the schema, so this indicates a server-side permission or severe query parsing error.");
                    }
                    setBlogData([]);
                } else {
                    const json = await res.json();
                    if (json.data && json.data.length > 0) {
                        setBlogData(json.data);
                    } else {
                         console.warn("Strapi returned data, but the 'data' array was empty. Check if you have published posts.");
                         setBlogData([]);
                    }
                }
            } catch (error) {
                console.error("NETWORK/FETCH ERROR: Could not connect to Strapi.", error);
                setBlogData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogPreviewData();
    }, []);


    if (isLoading) {
        return (
            <section className="blog-preview-section section-padding">
                <div className="container text-center">
                    <h2 className="section-title">News & Stories</h2>
                    <p className="text-gray-500">Loading recent articles...</p>
                </div>
            </section>
        );
    }

    if (blogData.length === 0) {
        return (
            <section className="blog-preview-section section-padding">
                <div className="container text-center">
                    <h2 className="section-title">News & Stories</h2>
                    <p className="text-red-600 font-semibold">No recent articles found to display.</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Please check the browser console for network errors, and verify your Strapi collection name and content permissions.
                    </p>
                </div>
            </section>
        );
    }

    // Determine the base domain for images
    const baseDomain = API_BASE_URL ? API_BASE_URL.replace('/api', '').replace(/\/$/, '') : '';

    return (
        <section className="blog-preview-section section-padding">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section-title">News & Stories</h2>
                </div>
                <div className="row justify-content-center">
                    {blogData.map((post) => {
                        // Null checks are retained for robustness.
                        if (!post || !post.attributes) {
                            console.warn("Skipping blog post item due to missing 'post' or 'post.attributes'. Item ID:", post ? post.id : 'unknown');
                            return null;
                        }
                        
                        const attributes = post.attributes;
                        
                        const title = attributes.Title || 'Untitled Post';
                        const slug = attributes.Slug || '#';
                        const publishedDate = moment(attributes.PublishedDate || new Date()); 
                        
                        // Image and Author are now expected to be correctly populated due to the fix.
                        let imageUrl = attributes.Image?.data?.attributes?.url;
                        
                        // 💡 Using capitalized 'Author' for data retrieval to match the query name.
                        const authorName = attributes.Author?.data?.attributes?.Name || 'Unknown Author';

                        // Construct the full image URL if relative
                        if (imageUrl && imageUrl.startsWith('/uploads')) {
                            imageUrl = `${baseDomain}${imageUrl}`;
                        }

                        const imageAlt = attributes.Image?.data?.attributes?.alternativeText || title;
                        const postLink = `/blog-single/${slug}`;

                        return (
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={post.id}>
                                <div className="blog-item h-100 shadow-sm">
                                    <div className="entry-media position-relative" style={{ height: '200px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {imageUrl ? (
                                            <img 
                                                src={imageUrl} 
                                                alt={imageAlt} 
                                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                                className="img-fluid"
                                            />
                                        ) : (
                                            <span className="text-gray-600 font-medium text-sm p-4">Image Not Available</span>
                                        )}
                                        
                                        <span
                                            className="date-overlay position-absolute top-0 start-0 text-center text-white p-2"
                                            style={{ backgroundColor: '#4A9FDA' }}
                                        >
                                            {publishedDate.format('DD')}<br />{publishedDate.format('MMM').toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="entry-details p-4">
                                        <h3 style={{ fontSize: '20px', color: 'rgb(0, 0, 0)', fontFamily: 'Nunito, sans-serif', fontWeight: '600' }}>
                                            <Link href={postLink}>
                                                {title}
                                            </Link>
                                        </h3>
                                        <p className="text-sm text-gray-500">By: {authorName}</p>
                                        
                                        <Link href={postLink} className="read-more">READ MORE...</Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="text-center mt-5">
                    <Link href="/blog-fullwidth" passHref>
                        <div className="theme-btn" style={{
                            backgroundColor: '#4A9FDA',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: '25px',
                            fontWeight: 'bold',
                            display: 'inline-block',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                            textDecoration: 'none'
                        }}>
                            View All Stories
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
