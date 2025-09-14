import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle'
import Contactpage from '../../components/Contactpage/Contactpage'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Logo from '/public/images/logo-2.svg'
import Layout from '../../components/Layout/Layout';

const ContactPage = () => {
    return (
        <Fragment>
            <PageTitle pageTitle={'Contact Us'} pagesub={'Contact'} />
            <Contactpage />
            <Scrollbar />
        </Fragment>
    )
};
export default ContactPage;