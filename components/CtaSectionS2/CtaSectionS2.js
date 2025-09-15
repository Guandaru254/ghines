import React from 'react';
import Link from 'next/link';

import shape from '/public/images/healthcare-with.svg'
import Image from 'next/image';

const CtaSectionS2 = () => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }
    return (
        <section className="cta-section-s2">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-12">
                        <div className="content">
                            <h3>Every Action Big or Small<span>Counts</span></h3>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="all-btn">
                            <Link onClick={ClickHandler} href="" className="theme-btn">Get Involved </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSectionS2;