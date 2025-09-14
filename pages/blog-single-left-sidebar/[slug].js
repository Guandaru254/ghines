import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle'
import BlogSingle from '../../components/BlogDetails/BlogSingle.js'
import Scrollbar from '../../components/scrollbar/scrollbar'
import { useRouter } from 'next/router'
import blogs from '../../api/blogs'
import NewHeader from '../../components/NewHeader/newheader.js';
import Footer from '../../components/footer/Footer';

import logo from '/public/images/logo-2.svg';

const BlogDetailsLeftSiide = () => {

    const router = useRouter()

    const BlogDetails = blogs.find(item => item.slug === router.query.slug)

    return (
        <Fragment>
            <NewHeader/>
            <PageTitle pageTitle={BlogDetails?.title} pagesub={'Blog'} />
            <BlogSingle blLeft={'order-lg-1'} blRight={'order-lg-2'} blSclass={'blog-single-left-sidebar-section'} />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogDetailsLeftSiide;
