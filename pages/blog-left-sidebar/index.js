import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle'
import BlogList from '../../components/BlogList/BlogList'
import Scrollbar from '../../components/scrollbar/scrollbar'
import NewHeader from '../../components/NewHeader/newheader.js'; 
import Footer from '../../components/footer/Footer';

import logo from '/public/images/logo-2.svg';

const BlogPageLeft = () => {
    return (
        <Fragment>
            <NewHeader/>
            <PageTitle pageTitle={'Latest News'} pagesub={'Blog'} />
            <BlogList blnewclass={'blog-pg-left-sidebar'} blLeft={'order-lg-1'} blRight={'order-lg-2'} />
            <Footer/>
            <Scrollbar />
        </Fragment>
    )
};
export default BlogPageLeft;

