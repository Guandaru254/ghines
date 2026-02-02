import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import AboutS2 from '../../components/about2/about2';
import AboutS3 from '../../components/about3/about3';
import CtaSectionS2 from '../../components/CtaSectionS2/CtaSectionS2';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Layout from '../../components/Layout/Layout';
import SDG from '../../components/sdg/sdg';

const AboutPage = () => {
    return (
        <Fragment>
            <PageTitle pageTitle={'Who We Are'} pagesub={'About'} />
            <AboutS2 hclass={'about-section-s4'} />
            <SDG h-class={'sdg'} />
            <AboutS3 hclass={'about-section-s4 section-padding'} />
            <CtaSectionS2 hclass={'cta-section-s2'} />
            <Scrollbar />
        </Fragment>
    );
};

export default AboutPage;