import React, { useState } from 'react';
import Link from 'next/link';
import moment from 'moment';

const BlogList = (props) => {
    if (!props.posts || props.posts.length === 0) {
        return <p>No posts to display.</p>;
    }

    const columnClass = "col col-lg-6 col-md-12 col-sm-12 col-12";

    return (
        <section className="blog-pg-section section-padding undefined">
            <div className="container">
                <div className="row">
                    {props.posts.map((post) => {
                        const date = moment(post.PublishedDate);
                        const day = date.format('DD');
                        const month = date.format('MMM').toUpperCase();
                        const postLink = `/blog-single/${post.Slug}`;
                        
                        // Access the image URL safely
                        const imageUrl = post.Image?.url;

                        // Debugging: Log each post's image URL
                        console.log(`[BlogList Debug] Post ID: ${post.id}, Title: ${post.Title}, Image URL: ${imageUrl}`);

                        return (
                            <div className={columnClass} key={post.id}>
                                <div className="blog-item h-100 shadow-sm">

                                    {/* 1. Date Display (Left Column) */}
                                    <div className="blog-date-display">
                                        <div className="month-display">{month}</div>
                                        <div className="day-display">{day}</div>
                                    </div>

                                    {/* 2. Post Content (Right Column) */}
                                    <div className="blog-content">
                                        
                                        {/* 🎯 IMAGE RENDERING WITH ERROR HANDLING */}
                                        {imageUrl ? (
                                            <div className="blog-img" style={{ 
                                                marginBottom: '20px',
                                                overflow: 'hidden',
                                                backgroundColor: '#f5f5f5'
                                            }}>
                                                <Link href={postLink}>
                                                    <img 
                                                        src={imageUrl} 
                                                        alt={post.Title || "Blog Post Image"}
                                                        style={{ 
                                                            width: '100%', 
                                                            height: 'auto', 
                                                            display: 'block',
                                                            objectFit: 'cover',
                                                            maxHeight: '400px'
                                                        }}
                                                        onError={(e) => {
                                                            console.error(`[IMAGE ERROR] Failed to load: ${imageUrl}`);
                                                            console.error('Error event:', e);
                                                            // Replace with placeholder
                                                            e.target.style.display = 'none';
                                                            e.target.parentElement.innerHTML = `
                                                                <div style="
                                                                    width: 100%; 
                                                                    height: 250px; 
                                                                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                                                    display: flex;
                                                                    align-items: center;
                                                                    justify-content: center;
                                                                    color: white;
                                                                    font-size: 14px;
                                                                    text-align: center;
                                                                    padding: 20px;
                                                                ">
                                                                    <div>
                                                                        <div style="font-size: 48px; margin-bottom: 10px;">📸</div>
                                                                        <div>Image Unavailable</div>
                                                                        <div style="font-size: 10px; margin-top: 5px; opacity: 0.7;">
                                                                            ${imageUrl}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            `;
                                                        }}
                                                        onLoad={(e) => {
                                                            console.log(`[IMAGE SUCCESS] Loaded: ${imageUrl}`);
                                                        }}
                                                        loading="lazy"
                                                        crossOrigin="anonymous"
                                                    />
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="blog-img" style={{ 
                                                marginBottom: '20px',
                                                width: '100%', 
                                                height: '250px', 
                                                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#666',
                                                fontSize: '14px',
                                                borderRadius: '4px'
                                            }}>
                                                <div style={{ textAlign: 'center' }}>
                                                    <div style={{ fontSize: '48px', marginBottom: '10px' }}>📰</div>
                                                    <div>No Image Available</div>
                                                </div>
                                            </div>
                                        )}
                                        {/* ------------------------------------------- */}

                                        <div className="entry-meta">
                                            <ul>
                                                <li>
                                                    <i className="fi flaticon-user"></i> By {post.Author || 'The Ghines Foundation'}
                                                </li>
                                                <li>
                                                    <i className="fi flaticon-clock"></i> 3 Min Read
                                                </li>
                                            </ul>
                                        </div>

                                        <h3>
                                            <Link href={postLink}>{post.Title}</Link>
                                        </h3>
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