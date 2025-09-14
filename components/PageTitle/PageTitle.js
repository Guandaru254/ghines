import React from 'react';
import Link from 'next/link';

const PageTitle = (props) => {
    return (
        <section 
            className="page-title" 
            style={{ 
                backgroundColor: '#4A94DA',
                fontFamily: 'Nunito',
                color: 'white',
                marginTop: '0px',
                paddingTop: '80px', // You can keep this or remove it depending on your final design choice
                paddingBottom: '80px' 
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-content text-center">
                            <h1 className="page-main-title" style={{ color: 'white' }}>{props.pageTitle}</h1>
                           
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageTitle;