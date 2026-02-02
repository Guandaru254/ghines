import React, { Fragment } from 'react';
import Hero from '../../components/hero/hero';
import PartnerSection from '../../components/PartnerSection/PartnerSection';
import FunFact from '../../components/FunFact/FunFact';
import About from '../../components/about/about';
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import CausesSection from '../../components/CausesSection/CausesSection';
import CtaSection from '../../components/CtaSection/CtaSection';
import ProjectSection from '../../components/ProjectSection/ProjectSection';
import ProcessSection from '../../components/ProcessSection/ProcessSection';
import InstagamSection from '../../components/InstagamSection/InstagamSection';
import BlogSection from '../../components/BlogSection/BlogSection';
import Scrollbar from '../../components/scrollbar/scrollbar';

const HomePage = () => {
    return (
        <Fragment>
            <Hero/>
            <PartnerSection/>
            <FunFact />
            <About/>
            <ServiceSection/>
            <CausesSection/>
            <CtaSection/>
            <ProjectSection/> 
            <ProcessSection />
            <InstagamSection/>
            <BlogSection/>
            <Scrollbar /> 
        </Fragment>
    )
};
export default HomePage;