// components/BlogPreview/BlogPreview.js

import React from 'react';
import Link from 'next/link';
import blogs from '../../api/blogs';
import Image from 'next/image';

const BlogPreview = () => {
    const blogData = blogs.slice(0, 3);

    return (
        <section className="blog-preview-section section-padding">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section-title"> News & Stories</h2>
                </div>
                <div className="row justify-content-center">
                    {blogData.map((blog, bitem) => (
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={bitem}>
                            <div className="blog-item h-100 shadow-sm">
                                <div className="entry-media position-relative">
                                    <Image src={blog.blogSingleImg} alt='' width={700} height={450} layout="responsive" />
                                    <span
                                        className="date-overlay position-absolute top-0 start-0 text-center text-white p-2"
                                        style={{ backgroundColor: '#4A9FDA' }}
                                    >
                                        {blog.day}<br />{blog.month}
                                    </span>
                                </div>
                                <div className="entry-details p-4">
                                    <h3 style={{ fontSize: '20px', color: 'rgb(0, 0, 0)', fontFamily: 'Nunito, sans-serif', fontWeight: '600' }}>
                                        {blog.title2}
                                    </h3>
                                    {/* The entire entry-meta section has been removed. */}
                                    <Link href="#" className="read-more">READ MORE...</Link>
                                </div>
                            </div>
                        </div>
                    ))}
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
                            View All Posts
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;