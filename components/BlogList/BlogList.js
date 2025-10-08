import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Custom hook to detect window size (required for conditional rendering/styling)
// NOTE: You must create this file or replace this with a library like 'react-use'
// See "ACTION REQUIRED" below for the hook implementation.
import useWindowSize from '../../hooks/useWindowSize'; 

// --- 🛑 CRITICAL LAYOUT FIX COMPONENT ---
// This wrapper applies the inline style bypass based on the current viewport size.
const ConditionalColumn = ({ children, postId, className }) => {
    // 768px is the 'md' breakpoint where the 50% width should activate.
    const MD_BREAKPOINT = 768; 
    const { width } = useWindowSize(); // Get current window width

    // The inline style to force the 50% width
    const force50PercentStyle = {
        width: '50%',
        flexBasis: '50%',
        maxWidth: '50%',
        flexShrink: 0,
        flexGrow: 0,
    };

    // Apply the force style ONLY if the current screen width is at or above the MD breakpoint
    const style = width >= MD_BREAKPOINT ? force50PercentStyle : {};

    return (
        <div 
            className={className} 
            key={postId} 
            style={style} // INLINE STYLE OVERRIDE APPLIED HERE
        >
            {children}
        </div>
    );
};
// ----------------------------------------


// BlogList component now expects and uses the 'posts' prop
const BlogList = ({ posts, blnewclass }) => { 
    const articles = posts || []; 
    
    if (articles.length === 0) {
        return null; 
    }

    return (
        <section className={`blog-pg-section section-padding ${blnewclass}`}>
            <div className="container">
                <div className="row justify-content-center">
                    
                    {/* Map over the actual Strapi data (articles) */}
                    {articles.map((post) => {
                        
                        const postDate = new Date(post.PublishedDate);
                        const day = postDate.toLocaleDateString('en-US', { day: '2-digit' });
                        const month = postDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                        
                        return (
                            // Use the custom component for the column to apply conditional inline style
                            <ConditionalColumn 
                                className="col-lg-6 col-md-6 col-sm-12 mb-4" 
                                postId={post.id} // Pass post.id as the key
                            >
                                <div className="blog-item h-100 shadow-sm">
                                    <div className="entry-media position-relative">
                                        
                                        {/* Access Image URL from the flattened object */}
                                        {post.Image?.url && (
                                            <Image 
                                                src={post.Image.url} 
                                                alt={post.Title || 'News Image'} 
                                                width={700} 
                                                height={450} 
                                                layout="responsive" 
                                            />
                                        )}
                                        
                                        {/* Use the correct date field for display */}
                                        <span className="date-overlay position-absolute top-0 start-0 text-center text-white p-2" 
                                            style={{ backgroundColor: '#4A94DA', borderRadius: '0' }} 
                                        >
                                            {day}<br />{month}
                                        </span>
                                    </div>
                                    <div className="entry-details p-4">
                                        
                                        {/* Use Strapi Title field */}
                                        <h3>
                                            <Link href={`/news-stories/${post.Slug}`}>
                                                {post.Title}
                                            </Link>
                                        </h3>
                                        <div className="entry-meta my-3">
                                            <ul className="list-unstyled d-flex">
                                                {/* Use Strapi Author field */}
                                                <li className="me-4"><i className="fi flaticon-user"></i> By <span>{post.Author}</span></li>
                                                {/* Keeping placeholder for read time */}
                                                <li><i className="fi flaticon-clock"></i><span>3 min Read</span></li> 
                                            </ul>
                                        </div>
                                        <Link href={`/news-stories/${post.Slug}`} className="read-more">READ MORE...</Link>
                                    </div>
                                </div>
                            </ConditionalColumn>
                        )
                    })}
                </div>
                
                {/* Pagination code remains here */}
                <div className="pagination-wrapper text-center mt-5">
                    <ul className="pg-pagination">
                        <li><a href="#" aria-label="Previous"><i className="fi ti-angle-left"></i></a></li>
                        <li className="active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#" aria-label="Next"><i className="fi ti-angle-right"></i></a></li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default BlogList;