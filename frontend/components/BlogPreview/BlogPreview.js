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
    }
];

const BlogPreview = () => {
    const [blogData, setBlogData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [useFallback, setUseFallback] = useState(false);

    useEffect(() => {
        const fetchBlogPreviewData = async () => {
            if (!API_BASE_URL) {
                setBlogData(FALLBACK_POSTS);
                setUseFallback(true);
                setIsLoading(false);
                return;
            }

            const fetchBaseUrl = API_BASE_URL.startsWith('//') ? `https:${API_BASE_URL}` : API_BASE_URL;
            const cleanApiUrl = fetchBaseUrl.replace(/\/$/, '');
            const queryPath = '/api/news-stories?populate=*&sort[0]=PublishedDate:desc&pagination[limit]=3';
            const url = `${cleanApiUrl}${queryPath}`;

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const result = await response.json();
                
                if (result.data && Array.isArray(result.data) && result.data.length > 0) {
                    const formattedData = result.data.map(item => {
                        // Extracting top-level or nested attributes based on Strapi version
                        const attr = item.attributes || item;
                        return {
                            id: item.id,
                            attributes: {
                                Title: attr.Title || 'Untitled Post',
                                Slug: attr.Slug || '#',
                                Author: attr.Author || 'The Ghines Foundation',
                                // FIX: Use PublishedDate, fallback to createdAt, fallback to now
                                PublishedDate: attr.PublishedDate || attr.createdAt || new Date().toISOString(),
                                Image: extractImageData(attr.Image)
                            }
                        };
                    });
                    
                    setBlogData(formattedData);
                    setUseFallback(false);
                } else {
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

    const extractImageData = (imageData) => {
        if (!imageData) return null;
        if (imageData.url) {
            return { data: { attributes: { url: imageData.url, alternativeText: imageData.alternativeText || '' } } };
        }
        if (imageData.data?.attributes) return imageData;
        return null;
    };

    const constructImageUrl = (imageData) => {
        if (!imageData) return null;
        const imageAttributes = imageData.data?.attributes || imageData;
        let imageUrl = imageAttributes?.url;
        if (!imageUrl) return null;
        if (imageUrl.startsWith('http')) return imageUrl;
        return imageUrl.startsWith('/') ? `${STRAPI_MEDIA_URL}${imageUrl}` : `${STRAPI_MEDIA_URL}/${imageUrl}`;
    };

    if (isLoading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading latest stories...</p>
            </div>
        );
    }

    return (
        <section className="blog-preview-section section-padding py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section-title" style={{ fontWeight: '700', color: '#222' }}>Latest News & Stories</h2>
                    <div style={{ width: '60px', height: '3px', backgroundColor: '#4a9fda', margin: '15px auto' }}></div>
                </div>
                
                <div className="row">
                    {blogData.map((post) => {
                        const { Title, Slug, Author, PublishedDate, Image } = post.attributes;
                        
                        // DATE FIX: Ensure valid moment object even if date string is slightly malformed
                        const mDate = moment(PublishedDate);
                        const displayDay = mDate.isValid() ? mDate.format('DD') : '--';
                        const displayMonth = mDate.isValid() ? mDate.format('MMM').toUpperCase() : 'ERR';
                        
                        const imageUrl = constructImageUrl(Image);
                        const postLink = `/blog-single/${Slug}`;

                        return (
                            <div className="col-lg-4 col-md-6 mb-4" key={post.id}>
                                <div className="blog-card border-0 shadow-sm h-100 bg-white" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                                    <div className="position-relative" style={{ height: '220px' }}>
                                        {imageUrl ? (
                                            <Link href={postLink}>
                                                <img src={imageUrl} alt={Title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </Link>
                                        ) : (
                                            <div className="w-100 h-100 bg-light d-flex align-items-center justify-content-center text-muted">No Image</div>
                                        )}
                                        {/* Date Badge */}
                                        <div className="position-absolute top-0 start-0 m-3 text-white text-center" style={{ 
                                            backgroundColor: '#4a9fda', 
                                            padding: '10px', 
                                            borderRadius: '8px', 
                                            minWidth: '60px',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                        }}>
                                            <div style={{ fontSize: '20px', fontWeight: 'bold', lineHeight: '1' }}>{displayDay}</div>
                                            <div style={{ fontSize: '11px', fontWeight: '600' }}>{displayMonth}</div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-2 text-muted" style={{ fontSize: '13px' }}>
                                            <span className="me-3"><i className="fa fa-user me-1"></i> {Author}</span>
                                        </div>
                                        <h5 className="mb-3">
                                            <Link href={postLink} className="text-decoration-none" style={{ color: '#333', fontWeight: '600' }}>
                                                {Title}
                                            </Link>
                                        </h5>
                                        <Link href={postLink} className="text-decoration-none" style={{ color: '#4a9fda', fontWeight: '700', fontSize: '14px' }}>
                                            READ MORE <i className="fa fa-long-arrow-right ms-1"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;