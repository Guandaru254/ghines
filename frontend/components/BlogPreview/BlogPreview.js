import React from 'react';
import Link from 'next/link';

const BlogPreview = ({ posts }) => {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="blog-section section-padding" style={{ background: '#fff', padding: '100px 0' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center mb-5">
                        <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#000' }}>Latest News & Stories</h2>
                    </div>
                </div>

                <div className="row">
                    {posts.map((post) => (
                        <div className="col col-lg-4 col-md-6 col-12 mb-4" key={post.id}>
                            <div className="blog-item custom-blog-card">
                                
                                {/* Image & Blue Date Card */}
                                <div className="img-container">
                                    <div className="date-badge">
                                        <div className="date-day">{post.day}</div>
                                        <div className="date-month">{post.month}</div>
                                    </div>
                                    
                                    <div className="blog-img">
                                        <img 
                                            src={post.Image.url} 
                                            alt={post.Title} 
                                        />
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="text-content">
                                    <div className="post-meta">
                                        <span><i className="ti-user"></i> By {post.Author}</span>
                                        <span><i className="ti-timer"></i> 3 Min Read</span>
                                    </div>

                                    <h3 className="post-title">
                                        <Link href={`/blog-single/${post.Slug}`}>
                                            {post.Title}
                                        </Link>
                                    </h3>

                                    <Link href={`/blog-single/${post.Slug}`} className="read-more">
                                        READ MORE →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* HOVER STYLES & TRANSITIONS */}
            <style jsx>{`
                .custom-blog-card {
                    background: #fff;
                    border: 1px solid #ebebeb;
                    border-radius: 8px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .img-container {
                    position: relative;
                    height: 240px;
                    width: 100%;
                    overflow: hidden;
                }

                .blog-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                /* Image Zoom on Card Hover */
                .custom-blog-card:hover .blog-img img {
                    transform: scale(1.1);
                }

                .date-badge {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    background-color: #4a9fda;
                    color: #fff;
                    padding: 8px 12px;
                    border-radius: 4px;
                    text-align: center;
                    z-index: 10;
                    font-weight: 700;
                }

                .date-day { font-size: 20px; line-height: 1; }
                .date-month { font-size: 11px; text-transform: uppercase; }

                .text-content {
                    padding: 25px;
                    text-align: left;
                }

                .post-meta {
                    display: flex;
                    gap: 15px;
                    font-size: 13px;
                    color: #888;
                    margin-bottom: 15px;
                }

                .post-meta i { color: #4a9fda; margin-right: 5px; }

                .post-title {
                    font-size: 19px;
                    font-weight: 700;
                    line-height: 1.4;
                    margin-bottom: 25px;
                    min-height: 54px;
                }

                /* TITLE HOVER EFFECT */
                .post-title :global(a) {
                    color: #222;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .custom-blog-card:hover .post-title :global(a) {
                    color: #4a9fda;
                }

                .read-more {
                    color: #4a9fda;
                    font-weight: 700;
                    text-decoration: none;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    transition: letter-spacing 0.3s ease;
                }

                .read-more:hover {
                    letter-spacing: 1.5px;
                }
            `}</style>
        </section>
    );
};

export default BlogPreview;