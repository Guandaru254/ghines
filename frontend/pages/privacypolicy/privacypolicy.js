import React, { Fragment } from 'react';
import PrivacyPolicy from '../../components/PrivacyPolicy/PrivacyPolicy';
import PageTitle from '../../components/PageTitle/PageTitle';

const PrivacyPolicyPage = () => {
    return (
        <Fragment>
            <PageTitle pageTitle={'Privacy Policy'} pagesub={'Legal'} />
            <PrivacyPolicy />
        </Fragment>
    );
};

export default PrivacyPolicyPage;