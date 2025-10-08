import React from 'react';
// 🛑 FIX 1: Use Next.js's built-in Link component
import Link from 'next/link'; 
import moment from 'moment'; // Required for date formatting

const BlogList = (props) => {
    
    if (!props.posts || props.posts.length === 0) {
        return <p>No posts to display.</p>;
    }

    return (
        <section className="blog-pg-section section-padding undefined">
            <div className="container">
                <div className="row justify-content-center"> 
                    {props.posts.map((post) => {
                        // Date formatting using moment
                        const date = moment(post.PublishedDate);
                        const day = date.format('DD'); // e.g., '01'
                        const month = date.format('MMM').toUpperCase(); // e.g., 'OCT'
                        
                        // Construct the post link using the Slug
                        const postLink = `/blog-single/${post.Slug}`;

                        return (
                            <div className="col col-lg-6 col-md-6 col-sm-12 col-12" key={post.id}>
                                <div className="blog-item h-100 shadow-sm">
                                    {/* Conditionally render image/thumb if URL exists */}
                                    {post.Image?.url && (
                                        <div className="blog-img">
                                            {/* 🛑 FIX 1: Use Next.js Link syntax */}
                                            <Link href={postLink}>
                                                <img 
                                                    src={post.Image.url} 
                                                    alt={post.Title || "Blog Post Image"} 
                                                />
                                            </Link>
                                        </div>
                                    )}

                                    <div className="blog-content">
                                        <div className="date-overlay">
                                            {/* 🎯 FIX for Vertical Stacking: Use separate divs. */}
                                            <div className="month-display">{month}</div>
                                            <div className="day-display">{day}</div>
                                        </div>
                                        
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

                                        {/* 🛑 FIX 1: Use Next.js Link syntax */}
                                        <h3>
                                            <Link href={postLink}>{post.Title}</Link>
                                        </h3>
                                        <p>{post.Description}</p>

                                        <div className="read-more">
                                            {/* 🛑 FIX 1: Use Next.js Link syntax */}
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