import React, { Fragment } from 'react';
import NewHeader from '../../components/NewHeader/newheader.js'; import PageTitle from '../../components/pagetitle/PageTitle'
import Error from '../../components/404/404'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import Logo from '/public/images/logo-2.svg'

const ErrorPage =() => {
    return(
        <Fragment>
            <NewHeader/>
            <PageTitle pageTitle={'404'} pagesub={'404'}/> 
            <Error/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default ErrorPage;



