import React from 'react';
import Link from 'next/link'; 
import moment from 'moment'; 

const BlogList = (props) => {
    
    if (!props.posts || props.posts.length === 0) {
        return <p>No posts to display.</p>;
    }

    return (
        <section className="blog-pg-section section-padding undefined">
            <div className="container">
                <div className="row"> 
                    {props.posts.map((post, index) => {
                        // Date formatting using moment
                        const date = moment(post.PublishedDate);
                        const day = date.format('DD'); 
                        const month = date.format('MMM').toUpperCase(); 
                        
                        // Construct the post link using the Slug
                        const postLink = `/blog-single/${post.Slug}`;
                        
                        // 🎯 NEW LOGIC: Apply different column sizes based on index
                        // Posts 1 & 2 (index 0 and 1) get half width (6/12 columns) to be side-by-side.
                        // All other posts (index 2 onwards) get full width (12/12 columns) for the 'single one' feature.
                        const columnClass = index < 2 
                            ? "col col-lg-6 col-md-12 col-sm-12 col-12" // Top two posts side-by-side
                            : "col col-lg-12 col-md-12 col-sm-12 col-12"; // All posts 3+ are full width features


                        return (
                            // Use the dynamically determined columnClass
                            <div className={columnClass} key={post.id}>
                                <div className="blog-item h-100 shadow-sm">
                                    {/* Conditionally render image/thumb if URL exists */}
                                    {post.Image?.url && (
                                        <div className="blog-img">
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
