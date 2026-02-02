import React, { Fragment } from 'react';
import Hero from '../components/hero/hero';
import EventSection from '../components/EventSection/EventSection';
import Scrollbar from '../components/scrollbar/scrollbar';
import BlogPreview from '../components/BlogPreview/BlogPreview';

const HomePage = () => {
    return (
        <Fragment>
            <Hero/>
            <EventSection /> 
            {/* The Updated Blog Preview Section */}
            <BlogPreview />
            <Scrollbar /> 
        </Fragment>
    )
};

export default HomePage;