import React, { Fragment } from 'react';
import Hero from '../components/hero/hero';
import PartnerSection from '../components/PartnerSection/PartnerSection';
import FunFact from '../components/FunFact/FunFact';
import About from '../components/about/about';
import EventSection from '../components/EventSection/EventSection';
import ServiceSection from '../components/ServiceSection/ServiceSection';
import CausesSectionS4 from '../components/CausesSectionS4/CausesSectionS4';
import CtaSection from '../components/CtaSection/CtaSection';
import ProjectSection from '../components/ProjectSection/ProjectSection';
import TestimonialS3 from '../components/TestimonialS3/TestimonialS3';
import ProcessSection from '../components/ProcessSection/ProcessSection';
import InstagamSection from '../components/InstagamSection/InstagamSection';
import BlogSection from '../components/BlogSection/BlogSection';
import Scrollbar from '../components/scrollbar/scrollbar';
import Logo from '/public/images/logo-2.svg';
import Layout from '../components/Layout/Layout';
import BlogPreview from '../components/BlogPreview/BlogPreview';

const HomePage = () => {
    return (
        <Fragment>
            <Hero/>
            {/* <PartnerSection hclass={'partners-section'} /> */}
            {/* <FunFact /> */}
            {/* <About hclass={'about-section section-padding'}/> */}
            <EventSection  /> 
            {/* <CausesSection hclass={"causes-section section-padding pt-0"} /> */}
            {/* <ProjectSection hclass={'project-section section-padding'}/> */} 
            {/* <Testimonial tClass={'testimonial-section'} /> */}
            {/* <ProcessSection /> */}
            {/* <InstagamSection hclass={'instagam-section section-padding pb-0'}/> */}
            {/* <BlogSection tClass={'blog-section section-padding'}/> */}
            <BlogPreview />
            <Scrollbar /> 
        </Fragment>
    )
};
export default HomePage;