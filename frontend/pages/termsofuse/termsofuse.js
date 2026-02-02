import React, { Fragment } from 'react';
import TermsofUse from '../../components/TermsofUse/TermsofUse';
import PageTitle from '../../components/PageTitle/PageTitle';

const TermsOfUsePage = () => {
    return (
        <Fragment>
            <PageTitle pageTitle={'Terms of Use'} pagesub={'Legal'} />
            <TermsofUse />
        </Fragment>
    );
};

export default TermsOfUsePage;