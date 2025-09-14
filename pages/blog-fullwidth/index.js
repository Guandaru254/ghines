import React, {Fragment} from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import BlogList from '../../components/BlogList/BlogList';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Layout from '../../components/Layout/Layout';

import logo from '/public/images/logo-2.svg';

const BlogPageFullwidth = () => {
    return (
        <Fragment>
            <style jsx>{`
                .page-title {
                    background-color: #4A9FDA;
                }
            `}</style>
            <PageTitle pageTitle={'News & Stories'} pagesub={'Blog'}/> 
            <BlogList blLeft={'d-none'} blRight={'col-lg-10 offset-lg-1'}/>
            <Scrollbar/>
        </Fragment>
    );
};
export default BlogPageFullwidth;
