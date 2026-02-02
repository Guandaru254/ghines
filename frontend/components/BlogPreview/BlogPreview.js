import React from 'react';
import Link from 'next/link';

const BlogPreview = ({ posts = [] }) => {
    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <section className="blog-preview-section py-5 bg-white">
            <div className="container">
                <div className="text-center mb-5">
                    <span 
                        className="text-uppercase" 
                        style={{ 
                            color: '#4a9fda', 
                            letterSpacing: '2px', 
                            fontWeight: '700', 
                            fontSize: '14px' 
                        }}
                    >
                        NEWS FEED
                    </span>
                    <h2 
                        className="mt-2" 
                        style={{ 
                            fontWeight: '800', 
                            color: '#1a1a1a', 
                            fontSize: '36px' 
                        }}
                    >
                        Latest News & Stories
                    </h2>
                    <div 
                        style={{ 
                            width: '70px', 
                            height: '4px', 
                            backgroundColor: '#4a9fda', 
                            margin: '20px auto', 
                            borderRadius: '2px' 
                        }}
                    ></div>
                </div>
                
                <div className="row">
                    {posts.map((post) => {
                        // Ensure we have day and month
                        const day = post.day || '01';
                        const month = post.month || 'JAN';
                        
                        return (
                            <div className="col-lg-4 col-md-6 mb-4" key={post.id}>
                                <div 
                                    className="blog-card h-100" 
                                    style={{ 
                                        borderRadius: '12px', 
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        position: 'relative',
                                        backgroundColor: '#fff'
                                    }}
                                >
                                    {/* Image Section */}
                                    <div 
                                        style={{ 
                                            position: 'relative',
                                            height: '250px', 
                                            overflow: 'hidden' 
                                        }}
                                    >
                                        <Link href={`/blog-single/${post.slug}`}>
                                            <img 
                                                src={post.image} 
                                                alt={post.title} 
                                                style={{ 
                                                    width: '100%', 
                                                    height: '100%', 
                                                    objectFit: 'cover',
                                                    cursor: 'pointer',
                                                    transition: 'transform 0.3s ease',
                                                    display: 'block'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                onError={(e) => {
                                                    e.currentTarget.src = '/images/blog/placeholder.jpg';
                                                }}
                                            />
                                        </Link>
                                        
                                        {/* Date Badge - Absolute positioning */}
                                        <div 
                                            style={{ 
                                                position: 'absolute',
                                                top: '20px',
                                                left: '20px',
                                                backgroundColor: '#4a9fda', 
                                                color: '#fff',
                                                padding: '12px 15px', 
                                                borderRadius: '8px', 
                                                textAlign: 'center',
                                                minWidth: '70px',
                                                boxShadow: '0 4px 12px rgba(74, 159, 218, 0.5)',
                                                zIndex: 10,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <div style={{ 
                                                fontSize: '28px', 
                                                fontWeight: 'bold', 
                                                lineHeight: '1',
                                                marginBottom: '5px'
                                            }}>
                                                {day}
                                            </div>
                                            <div style={{ 
                                                fontSize: '12px', 
                                                fontWeight: '600',
                                                letterSpacing: '1px'
                                            }}>
                                                {month}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div style={{ padding: '25px' }}>
                                        {/* Author & Read Time */}
                                        <div 
                                            style={{ 
                                                fontSize: '13px',
                                                color: '#666',
                                                marginBottom: '15px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '15px',
                                                flexWrap: 'wrap'
                                            }}
                                        >
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <i className="fi flaticon-user" style={{ color: '#4a9fda' }}></i>
                                                <span>By <strong>{post.author}</strong></span>
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <i className="fi flaticon-clock" style={{ color: '#4a9fda' }}></i>
                                                <span>3 Min Read</span>
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h5 
                                            style={{ 
                                                minHeight: '60px',
                                                fontSize: '20px',
                                                lineHeight: '1.4',
                                                marginBottom: '15px'
                                            }}
                                        >
                                            <Link 
                                                href={`/blog-single/${post.slug}`}
                                                style={{ 
                                                    color: '#222', 
                                                    fontWeight: '700',
                                                    textDecoration: 'none',
                                                    transition: 'color 0.3s ease'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.color = '#4a9fda'}
                                                onMouseOut={(e) => e.currentTarget.style.color = '#222'}
                                            >
                                                {post.title}
                                            </Link>
                                        </h5>

                                        {/* Description */}
                                        {post.description && (
                                            <p style={{ 
                                                color: '#666',
                                                fontSize: '14px',
                                                lineHeight: '1.6',
                                                marginBottom: '20px'
                                            }}>
                                                {post.description.length > 100 
                                                    ? `${post.description.substring(0, 100)}...` 
                                                    : post.description
                                                }
                                            </p>
                                        )}

                                        {/* Read More Link */}
                                        <Link 
                                            href={`/blog-single/${post.slug}`}
                                            style={{ 
                                                color: '#4a9fda', 
                                                fontWeight: '700', 
                                                fontSize: '14px',
                                                textDecoration: 'none',
                                                transition: 'color 0.3s ease',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.color = '#357ab8'}
                                            onMouseOut={(e) => e.currentTarget.style.color = '#4a9fda'}
                                        >
                                            READ MORE <i className="fa fa-long-arrow-right"></i>
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