import React from 'react';
import Link from 'next/link';

const BlogList = (props) => {
    
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
                        
                        // Date formatting
                        let day = '??', month = '???';
                        try {
                            if (post.PublishedDate) {
                                const d = new Date(post.PublishedDate);
                                if (!isNaN(d.getTime())) {
                                    day = String(d.getDate()).padStart(2, '0');
                                    month = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][d.getMonth()];
                                }
                            }
                        } catch (e) {
                            console.error(`Error parsing date for post ${post.id}:`, e);
                        }
                        
                        const postLink = `/blog-single/${post.Slug}`;
                        const imageUrl = post.Image?.url;

                        // First two posts are half width (col-6), third post is also half width (col-6), rest are full width (col-12)
                        const columnClass = index < 3 
                            ? "col col-lg-6 col-md-12 col-sm-12 col-12"
                            : "col col-lg-12 col-md-12 col-sm-12 col-12";

                        return (
                            <div className={columnClass} key={post.id}>
                                <div className="blog-item h-100 shadow-sm" style={{ 
                                    position: 'relative',
                                    marginBottom: '30px',
                                    borderRadius: '8px',
                                    overflow: 'hidden'
                                }}>
                                    
                                    {/* Date Display with baby blue background */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '20px',
                                        left: '20px',
                                        backgroundColor: '#4a9fda',
                                        color: '#fff',
                                        padding: '15px 20px',
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                        zIndex: 1,
                                        minWidth: '70px',
                                        boxShadow: '0 4px 10px rgba(74, 159, 218, 0.4)'
                                    }}>
                                        <div style={{ 
                                            fontSize: '28px', 
                                            fontWeight: 'bold',
                                            lineHeight: '1'
                                        }}>{day}</div>
                                        <div style={{ 
                                            fontSize: '14px',
                                            marginTop: '5px',
                                            letterSpacing: '1px'
                                        }}>{month}</div>
                                    </div>

                                    <div className="blog-content">
                                        
                                        {/* Image Display - Now Linked */}
                                        {imageUrl ? (
                                            <div className="blog-img" style={{ position: 'relative' }}>
                                                <Link href={postLink}>
                                                    <img 
                                                        src={imageUrl} 
                                                        alt={post.Title || "Blog Post Image"} 
                                                        style={{ 
                                                            width: '100%', 
                                                            height: 'auto', 
                                                            display: 'block', 
                                                            maxHeight: index < 3 ? '300px' : '450px', 
                                                            objectFit: 'cover',
                                                            cursor: 'pointer',
                                                            transition: 'transform 0.3s ease'
                                                        }}
                                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                    />
                                                </Link>
                                            </div>
                                        ) : (
                                            <div style={{ 
                                                padding: '50px', 
                                                background: '#f5f5f5', 
                                                textAlign: 'center', 
                                                marginBottom: '20px',
                                                color: '#999'
                                            }}>
                                                No Image Available
                                            </div>
                                        )}

                                        <div style={{ padding: '25px' }}>
                                            <div className="entry-meta" style={{ marginBottom: '15px' }}>
                                                <ul style={{
                                                    listStyle: 'none',
                                                    padding: 0,
                                                    margin: 0,
                                                    display: 'flex',
                                                    gap: '20px',
                                                    fontSize: '14px',
                                                    color: '#666'
                                                }}>
                                                    <li>
                                                        <i className="fi flaticon-user" style={{ marginRight: '5px' }}></i> 
                                                        By <strong>{post.Author || 'The Ghines Foundation'}</strong>
                                                    </li>
                                                    <li>
                                                        <i className="fi flaticon-clock" style={{ marginRight: '5px' }}></i> 
                                                        3 Min Read
                                                    </li>
                                                </ul>
                                            </div>

                                            <h3 style={{ 
                                                fontSize: '22px',
                                                marginBottom: '15px',
                                                lineHeight: '1.4'
                                            }}>
                                                <Link 
                                                    href={postLink}
                                                    style={{
                                                        color: '#333',
                                                        textDecoration: 'none',
                                                        transition: 'color 0.3s ease'
                                                    }}
                                                    onMouseOver={(e) => e.currentTarget.style.color = '#4a9fda'}
                                                    onMouseOut={(e) => e.currentTarget.style.color = '#333'}
                                                >
                                                    {post.Title || 'Untitled Article'}
                                                </Link>
                                            </h3>

                                            {post.Description && (
                                                <p style={{ 
                                                    color: '#666',
                                                    fontSize: '15px',
                                                    lineHeight: '1.6',
                                                    marginBottom: '20px'
                                                }}>
                                                    {post.Description}
                                                </p>
                                            )}

                                            <div className="read-more">
                                                <Link 
                                                    href={postLink}
                                                    style={{
                                                        color: '#4a9fda',
                                                        textDecoration: 'none',
                                                        fontSize: '15px',
                                                        fontWeight: '600',
                                                        transition: 'color 0.3s ease',
                                                        display: 'inline-block'
                                                    }}
                                                    onMouseOver={(e) => e.currentTarget.style.color = '#357ab8'}
                                                    onMouseOut={(e) => e.currentTarget.style.color = '#4a9fda'}
                                                >
                                                    READ MORE...
                                                </Link>
                                            </div>
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