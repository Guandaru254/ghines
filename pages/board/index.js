import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import TeamSection from '../../components/TeamSection/TeamSection';
import Scrollbar from '../../components/scrollbar/scrollbar';

const AboutPage = () => {
    return (
        <Fragment>
            <PageTitle pageTitle={'The Ghines Foundation Board'} pagesub={'About'} />
            <TeamSection hclass={'volunteer-section section-padding'} />
            <Scrollbar />
        </Fragment>
    );
};

export default AboutPage;