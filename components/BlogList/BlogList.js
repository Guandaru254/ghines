import React from 'react';
import Link from 'next/link';

// NOTE: Removed 'moment' dependency to reduce bundle size and rely on native Date parsing.

const BlogList = (props) => {
    
    // Ensure data exists before rendering
    if (!props.posts || props.posts.length === 0) {
        return (
            <section className="blog-pg-section section-padding">
                <div className="container">
                    <p style={{ textAlign: 'center', padding: '50px' }}>No posts to display.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="blog-pg-section section-padding">
            <div className="container">
                <div className="row"> 
                    {props.posts.map((post, index) => {
                        
                        // === 1. DATE FORMATTING (From HEAD, using native Date) ===
                        let day = '??', month = '???';
                        try {
                            if (post.PublishedDate) {
                                const d = new Date(post.PublishedDate);
                                // Check if date is valid
                                if (!isNaN(d.getTime())) {
                                    day = String(d.getDate()).padStart(2, '0');
                                    // Using array lookup for month is faster and reliable
                                    month = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][d.getMonth()];
                                }
                            }
                        } catch (e) {
                            console.error(`Error parsing date for post ${post.id}:`, e);
                        }
                        
                        const postLink = `/blog-single/${post.Slug}`;
                        const imageUrl = post.Image?.url;

                        // === 2. DYNAMIC COLUMN CLASS (From cca8f89) ===
                        // Top two posts (index 0 and 1) are half width (6 columns).
                        // All other posts (index 2 onwards) are full width (12 columns).
                        const columnClass = index < 2 
                            ? "col col-lg-6 col-md-12 col-sm-12 col-12"
                            : "col col-lg-12 col-md-12 col-sm-12 col-12";

                        return (
                            <div className={columnClass} key={post.id}>
                                <div className="blog-item h-100 shadow-sm">
                                    
                                    {/* --- Date Display --- */}
                                    {/* Using a date overlay element from cca8f89, but content from HEAD */}
                                    <div className="blog-date-display">
                                        <div className="month-display">{month}</div>
                                        <div className="day-display">{day}</div>
                                    </div>

                                    <div className="blog-content">
                                        
                                        {/* --- Image Display --- */}
                                        {imageUrl ? (
                                            <div className="blog-img">
                                                <Link href={postLink}>
                                                    <img 
                                                        src={imageUrl} 
                                                        alt={post.Title || "Blog Post Image"} 
                                                        style={{ width: '100%', height: 'auto', display: 'block', maxHeight: index < 2 ? '250px' : '400px', objectFit: 'cover' }}
                                                        // Removed onLoad/onError console logs as they are debug artifacts
                                                    />
                                                </Link>
                                            </div>
                                        ) : (
                                            <div style={{ padding: '50px', background: '#f5f5f5', textAlign: 'center', marginBottom: '20px' }}>
                                                No Image Available
                                            </div>
                                        )}

                                        <div className="entry-meta">
                                            <ul>
                                                <li><i className="fi flaticon-user"></i> By {post.Author || 'The Ghines Foundation'}</li>
                                                <li><i className="fi flaticon-clock"></i> 3 Min Read</li>
                                            </ul>
                                        </div>

                                        <h3><Link href={postLink}>{post.Title || 'Untitled Article'}</Link></h3>
                                        <p>{post.Description}</p>

                                        <div className="read-more">
                                            <Link href={postLink}>READ MORE...</Link>
                                        </div>
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

export default BlogList;