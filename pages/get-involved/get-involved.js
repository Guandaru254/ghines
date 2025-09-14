import React, { Fragment } from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import GetInvolved from '../components/GetInvolved/GetInvolved';
import Scrollbar from '../components/scrollbar/scrollbar';
import NewHeader from '../components/NewHeader/newheader';
import Footer from '../components/footer/Footer';

const GetInvolvedPage = () => {
    return (
        <Fragment>
            <NewHeader />
            <main>
                <PageTitle pageTitle={'Get Involved'} pagesub={'Join Our Mission'} />
                <GetInvolved />
                <Scrollbar />
            </main>
            <Footer />
        </Fragment>
    );
};

export default GetInvolvedPage;