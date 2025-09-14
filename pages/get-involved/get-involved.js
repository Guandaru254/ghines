// src/pages/get-involved.js

import React, { Fragment } from 'react';
import Layout from '../components/Layout/Layout';
import PageTitle from '../components/pagetitle/PageTitle';
import GetInvolved from '../components/GetInvolved/GetInvolved';
import Scrollbar from '../components/scrollbar/scrollbar';

const GetInvolvedPage = () => {
    return (
        <Fragment>
            <Layout>
                <PageTitle pageTitle={'Get Involved'} pagesub={'Join Our Mission'} />
                <GetInvolved />
                <Scrollbar />
            </Layout>
        </Fragment>
    );
};

export default GetInvolvedPage;