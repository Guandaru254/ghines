import React, {Fragment} from 'react';
import PageTitle from '../../components/pagetitle/PageTitle'
import BlogList from '../../components/BlogList/BlogList'
import NewHeader from '../../components/NewHeader/newheader.js'; 
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import logo from '/public/images/logo-2.svg';

const BlogPage =() => {
    return(
        <Fragment>
            <NewHeader/>
            {/* Updated title to "News & Stories" */}
            <PageTitle pageTitle={'News & Stories'} pagesub={'News'}/> 
            <BlogList/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default BlogPage;