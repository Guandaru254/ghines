import React, { Fragment } from 'react';
import NewHeader from '../../components/NewHeader/newheader.js'; import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import { useRouter } from 'next/router'
import blogs from '../../api/blogs'
import BlogSingle from '../../components/BlogDetails/BlogSingle'
import Footer from '../../components/footer/Footer';
import logo from '/public/images/logo-2.svg';

const BlogDetails = (props) => {

    const router = useRouter()

    const BlogDetails = blogs.find(item => item.slug === router.query.slug)

    return (
        <Fragment>
            <NewHeader/>
            <PageTitle pageTitle={BlogDetails?.title} pagesub={'Blog'} />
            <BlogSingle />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogDetails;