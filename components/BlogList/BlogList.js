import React from 'react';
import Link from 'next/link';

const BlogList = (props) => {
    if (!props.posts || props.posts.length === 0) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>No posts</div>;
    }

    const columnClass = "col col-lg-6 col-md-12 col-sm-12 col-12";

    return (
        <section className="blog-pg-section section-padding">
            <div className="container">
                <div className="row">
                    {props.posts.map((post) => {
                        // Safe date parsing
                        let day = '01', month = 'JAN';
                        try {
                            if (post.PublishedDate) {
                                const d = new Date(post.PublishedDate);
                                if (!isNaN(d.getTime())) {
                                    day = String(d.getDate()).padStart(2, '0');
                                    month = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][d.getMonth()];
                                }
                            }
                        } catch (e) {}

                        const postLink = `/blog-single/${post.Slug}`;
                        const imageUrl = post.Image?.url;

                        console.log(`[BLOGLIST] Post ${post.id}: ${post.Title}, Image: ${imageUrl}`);

                        return (
                            <div className={columnClass} key={post.id}>
                                <div className="blog-item h-100 shadow-sm">
                                    <div className="blog-date-display">
                                        <div className="month-display">{month}</div>
                                        <div className="day-display">{day}</div>
                                    </div>

                                    <div className="blog-content">
                                        {imageUrl ? (
                                            <div className="blog-img">
                                                <Link href={postLink}>
                                                    <img 
                                                        src={imageUrl} 
                                                        alt={post.Title}
                                                        style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '400px', objectFit: 'cover' }}
                                                        onLoad={() => console.log('[IMG] ✅', imageUrl)}
                                                        onError={() => console.error('[IMG] ❌', imageUrl)}
                                                    />
                                                </Link>
                                            </div>
                                        ) : (
                                            <div style={{ padding: '50px', background: '#f5f5f5', textAlign: 'center', marginBottom: '20px' }}>
                                                No Image
                                            </div>
                                        )}

                                        <div className="entry-meta">
                                            <ul>
                                                <li><i className="fi flaticon-user"></i> By {post.Author}</li>
                                                <li><i className="fi flaticon-clock"></i> 3 Min Read</li>
                                            </ul>
                                        </div>

                                        <h3><Link href={postLink}>{post.Title}</Link></h3>
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