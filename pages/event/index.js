import React, { Fragment } from 'react';
import NewHeader from '../../components/NewHeader/newheader.js';
import PageTitle from '../../components/pagetitle/PageTitle'
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Logo from '/public/images/logo-2.svg'
import EventSectionS2 from '../../components/EventSectionS2/EventSectionS2';


const EventPage = () => {
    return (
        <Fragment>
            <NewHeader/>
            <PageTitle pageTitle={'Events'}  />
            <EventSectionS2 />
            <Footer />
            <Scrollbar />

        </Fragment>
    )
};
export default EventPage;
