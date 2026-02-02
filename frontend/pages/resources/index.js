import React from 'react';
import Head from 'next/head';
import Resources from '../../components/Resources/resources';
import PageTitle from '../../components/PageTitle/PageTitle';


const ResourcesPage = () => {
    return (
        <div>
            <Head>
                <title>Ghines Foundation - Resources</title>
                <meta name="description" content="Resources and reports from the Ghines Foundation." />
            </Head>
            <PageTitle pageTitle={'Resources'} pagesub={'About'} />
            <Resources />
        </div>
    );
};

export default ResourcesPage;
