// src/components/BlogList/BlogList.jsx

import React from 'react';
import Link from 'next/link';
import blogs from '../../api/blogs';
import Image from 'next/image';

const BlogList = (props) => {
    // The original logic for the full blog page, displaying 4 blogs with a specific layout.
    const blogData = [
        blogs[0], // 1st blog
        blogs[1], // 2nd blog
        blogs[2], // 3rd blog
        {...blogs[0], title2: "Placeholder Blog", day: "01", month: "OCT"} // 4th blog (copy of the first)
    ];

    return (
        <section className={`blog-pg-section section-padding ${props.blnewclass}`}>
            <div className="container">
                <div className="row justify-content-center">
                    {blogData.map((blog, bitem) => (
                        <div className="col-lg-6 col-md-6 col-sm-12 mb-4" key={bitem}>
                            <div className="blog-item h-100 shadow-sm">
                                <div className="entry-media position-relative">
                                    <Image src={blog.blogSingleImg} alt='' width={700} height={450} layout="responsive" />
                                    <span className="date-overlay position-absolute top-0 start-0 text-center text-white bg-primary p-2">
                                        {blog.day}<br />{blog.month}
                                    </span>
                                </div>
                                <div className="entry-details p-4">
                                    <h3>
                                        <Link href="#">
                                            {blog.title2}
                                        </Link>
                                    </h3>
                                    <div className="entry-meta my-3">
                                        <ul className="list-unstyled d-flex">
                                            <li className="me-4"><i className="fi flaticon-user"></i> By <span>{blog.author}</span></li>
                                            <li><i className="fi flaticon-clock"></i><span>3 min Read</span></li>
                                        </ul>
                                    </div>
                                    <Link href="#" className="read-more">READ MORE...</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination is always present on the full blog page */}
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