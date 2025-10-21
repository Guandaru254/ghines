import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment';

const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_MEDIA_URL = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || 'https://light-light-5ba7f2d7f7.media.strapiapp.com';

// EMERGENCY FALLBACK DATA
const FALLBACK_POSTS = [
    {
        id: 'fallback-1',
        attributes: {
            Title: 'Sample Article 1',
            Slug: 'sample-article-1',
            Author: 'The Ghines Foundation',
            PublishedDate: new Date().toISOString(),
            Image: {
                data: {
                    attributes: {
                        url: 'https://via.placeholder.com/400x300?text=Sample+Image+1',
                        alternativeText: 'Sample Image 1'
                    }
                }
            }
        }
    },
    {
        id: 'fallback-2',
        attributes: {
            Title: 'Sample Article 2',
            Slug: 'sample-article-2',
            Author: 'The Ghines Foundation',
            PublishedDate: new Date().toISOString(),
            Image: {
                data: {
                    attributes: {
                        url: 'https://via.placeholder.com/400x300?text=Sample+Image+2',
                        alternativeText: 'Sample Image 2'
                    }
                }
            }
        }
    },
    {
        id: 'fallback-3',
        attributes: {
            Title: 'Sample Article 3',
            Slug: 'sample-article-3',
            Author: 'The Ghines Foundation',
            PublishedDate: new Date().toISOString(),
            Image: {
                data: {
                    attributes: {
                        url: 'https://via.placeholder.com/400x300?text=Sample+Image+3',
                        alternativeText: 'Sample Image 3'
                    }
                }
            }
        }
    }
];

const BlogPreview = () => {
    const [blogData, setBlogData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [useFallback, setUseFallback] = useState(false);

    useEffect(() => {
        const fetchBlogPreviewData = async () => {
            if (!API_BASE_URL) {
                console.warn("[BlogPreview] API_BASE_URL is not configured. Using fallback data.");
                setBlogData(FALLBACK_POSTS);
                setUseFallback(true);
                setIsLoading(false);
                return;
            }

            const fetchBaseUrl = API_BASE_URL.startsWith('//') ? `https:${API_BASE_URL}` : API_BASE_URL;
            const cleanApiUrl = fetchBaseUrl.replace(/\/$/, '');
            const queryPath = '/api/news-stories?populate=*&sort[0]=PublishedDate:desc&pagination[limit]=3';
            const url = `${cleanApiUrl}${queryPath}`;

            console.log("[BlogPreview] Fetching from:", url);
        
            try {
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                console.log("[BlogPreview] Raw API Response:", result);
                
                if (result.data && Array.isArray(result.data) && result.data.length > 0) {
                    // Handle Strapi v5 flat structure (no nested attributes)
                    const formattedData = result.data.map(item => ({
                        id: item.id,
                        attributes: {
                            Title: item.Title || item.attributes?.Title || 'Untitled Post',
                            Slug: item.Slug || item.attributes?.Slug || '#',
                            Author: item.Author || item.attributes?.Author || 'The Ghines Foundation',
                            PublishedDate: item.PublishedDate || item.attributes?.PublishedDate || new Date().toISOString(),
                            Image: extractImageData(item.Image || item.attributes?.Image)
                        }
                    }));
                    
                    console.log("[BlogPreview] Formatted data:", formattedData);
                    setBlogData(formattedData);
                    setUseFallback(false);
                } else {
                    console.warn("[BlogPreview] Invalid data structure or no posts, using fallback");
                    setBlogData(FALLBACK_POSTS);
                    setUseFallback(true);
                }
            } catch (error) {
                console.error("[BlogPreview] Fetch error:", error);
                setBlogData(FALLBACK_POSTS);
                setUseFallback(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogPreviewData();
    }, []);

    // Helper function to extract image data from various Strapi formats
    const extractImageData = (imageData) => {
        if (!imageData) return null;

        // Handle Strapi v5 format (flat structure)
        if (imageData.url) {
            return {
                data: {
                    attributes: {
                        url: imageData.url,
                        alternativeText: imageData.alternativeText || ''
                    }
                }
            };
        }

        // Handle Strapi v4 format (nested attributes)
        if (imageData.data?.attributes) {
            return imageData;
        }

        return null;
    };

    // Helper function to construct proper image URL
    const constructImageUrl = (imageData) => {
        if (!imageData) return null;

        const imageAttributes = imageData.data?.attributes;
        let imageUrl = imageAttributes?.url;

        if (!imageUrl) return null;

        // If URL is already absolute, return as-is
        if (imageUrl.startsWith('http')) {
            return imageUrl;
        }

        // Check for optimized formats first
        const formats = imageAttributes?.formats;
        if (formats) {
            for (const size of ['large', 'medium', 'small', 'thumbnail']) {
                const formatUrl = formats[size]?.url;
                if (formatUrl) {
                    return formatUrl.startsWith('http')
                        ? formatUrl
                        : `${STRAPI_MEDIA_URL}${formatUrl.startsWith('/') ? '' : '/'}${formatUrl}`;
                }
            }
        }

        // Construct full URL from relative path
        return imageUrl.startsWith('/')
            ? `${STRAPI_MEDIA_URL}${imageUrl}`
            : `${STRAPI_MEDIA_URL}/${imageUrl}`;
    };

    if (isLoading) {
        return (
            <section className="blog-preview-section section-padding">
                <div className="container text-center">
                    <div style={{ padding: '50px' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading latest stories...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="blog-preview-section section-padding">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section-title">Latest News & Stories</h2>
                    {useFallback && (
                        <p className="text-muted">
                            <small>⚠️ Showing sample data. Check console for API connection details.</small>
                        </p>
                    )}
                </div>
                
                <div className="row justify-content-center">
                    {blogData.map((post) => {
                        if (!post || !post.attributes) {
                            console.warn("[BlogPreview] Invalid post structure:", post);
                            return null;
                        }
                        
                        const attributes = post.attributes;
                        const title = attributes.Title || 'Untitled Post';
                        const slug = attributes.Slug || '#';
                        const authorName = attributes.Author || 'The Ghines Foundation';
                        const publishedDate = moment(attributes.PublishedDate || new Date());
                        
                        const imageUrl = constructImageUrl(attributes.Image);
                        const imageAlt = attributes.Image?.data?.attributes?.alternativeText || title;
                        const postLink = `/blog-single/${slug}`;

                        console.log(`[BlogPreview] Rendering post ${post.id}: ${title}, Image: ${imageUrl}`);

                        return (
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={post.id}>
                                <div className="blog-item h-100 shadow-sm" style={{ 
                                    borderRadius: '8px', 
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                }}>
                                    <div className="entry-media position-relative" style={{ 
                                        height: '250px',
                                        overflow: 'hidden',
                                        backgroundColor: '#f5f5f5'
                                    }}>
                                        {imageUrl ? (
                                            <Link href={postLink}>
                                                <img 
                                                    src={imageUrl} 
                                                    alt={imageAlt}
                                                    style={{ 
                                                        width: '100%', 
                                                        height: '100%', 
                                                        objectFit: 'cover',
                                                        cursor: 'pointer',
                                                        transition: 'transform 0.3s ease'
                                                    }}
                                                    onLoad={() => console.log('[BlogPreview IMG] ✅ Loaded:', imageUrl)}
                                                    onError={(e) => {
                                                        console.error('[BlogPreview IMG] ❌ Failed:', imageUrl);
                                                        e.target.style.display = 'none';
                                                        e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;">Image unavailable</div>';
                                                    }}
                                                />
                                            </Link>
                                        ) : (
                                            <div style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center', 
                                                height: '100%',
                                                color: '#999',
                                                fontSize: '14px'
                                            }}>
                                                No Image Available
                                            </div>
                                        )}
                                        
                                        <span
                                            className="date-overlay position-absolute top-0 start-0 text-center text-white"
                                            style={{ 
                                                backgroundColor: '#4a9fda',
                                                padding: '15px 20px',
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                lineHeight: '1.2',
                                                boxShadow: '0 4px 10px rgba(74, 159, 218, 0.4)'
                                            }}
                                        >
                                            <div style={{ fontSize: '24px' }}>{publishedDate.format('DD')}</div>
                                            <div style={{ fontSize: '12px', marginTop: '2px' }}>{publishedDate.format('MMM').toUpperCase()}</div>
                                        </span>
                                    </div>                          
                                    <div className="entry-details" style={{ padding: '20px' }}>
                                        <div className="entry-meta mb-2">
                                            <ul style={{ 
                                                listStyle: 'none', 
                                                padding: 0, 
                                                margin: 0, 
                                                display: 'flex', 
                                                gap: '15px',
                                                fontSize: '13px',
                                                color: '#666'
                                            }}>
                                                <li><i className="fi flaticon-user"></i> By <strong>{authorName}</strong></li>
                                                <li><i className="fi flaticon-clock"></i> 3 Min Read</li>
                                            </ul>
                                        </div>
                                        
                                        <h3 style={{ 
                                            fontSize: '18px', 
                                            marginBottom: '15px',
                                            lineHeight: '1.4'
                                        }}>
                                            <Link href={postLink} style={{ 
                                                color: '#333', 
                                                textDecoration: 'none',
                                                transition: 'color 0.3s ease'
                                            }}>
                                                {title}
                                            </Link>
                                        </h3>
                                        
                                        <div className="read-more" style={{ marginTop: '15px' }}>
                                            <Link href={postLink} style={{ 
                                                color: '#4a9fda',
                                                textDecoration: 'none',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                transition: 'color 0.3s ease'
                                            }}>
                                                READ MORE...
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="text-center mt-5">
                    <Link href="/blog-fullwidth" className="btn" style={{
                        backgroundColor: '#4a9fda',
                        color: '#fff',
                        padding: '12px 30px',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        display: 'inline-block',
                        border: 'none',
                        fontWeight: '600',
                        transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#357ab8'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4a9fda'}
                    >
                        View All Stories
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;