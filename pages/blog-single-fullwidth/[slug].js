import React, { Fragment } from 'react';
import { useRouter } from 'next/router'
import blogs from '../../api/blogs'
import NewHeader from '../../components/NewHeader/newheader.js'; 
import PageTitle from '../../components/pagetitle/PageTitle'
import BlogSingle from '../../components/BlogDetails/BlogSingle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';

import logo from '/public/images/logo-2.svg';

const BlogDetailsFull = () => {
    const router = useRouter()

    const BlogDetails = blogs.find(item => item.slug === router.query.slug)
    return (
        <Fragment>
            <NewHeader/>
            <PageTitle pageTitle={BlogDetails?.title} pagesub={'Blog'} />
            <BlogSingle blLeft={'d-none'} blRight={'col-lg-10 offset-lg-1'} />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogDetailsFull;