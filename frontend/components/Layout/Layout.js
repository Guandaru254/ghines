// components/Layout/Layout.js
import React from 'react';
import NewHeader from '../NewHeader/newheader';
import Footer from '../footer/Footer';
import Scrollbar from '../scrollbar/scrollbar';

const Layout = ({ children }) => {
    return (
        <>
            <NewHeader />
            <main>
                {children}
            </main>
            <Footer />
            <Scrollbar />
        </>
    );
};

export default Layout;