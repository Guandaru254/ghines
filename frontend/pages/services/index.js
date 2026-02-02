// /c:/Users/PC/Desktop/Companies/Ghenis/frontend/pages/causes/index.js

import React, { Fragment } from 'react';
import Image from 'next/image';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import causes from '../../api/causes';
import Link from 'next/link';

const ClickHandler = () => {
    window.scrollTo(10, 0);
};

const CausesPage = () => {
    return (
        <Fragment>
            <PageTitle pageTitle={'What We Do'} />
            <section className="cause-pg-section section-padding">
                <div className="container">
                    <div className="row g-4">
                        {causes.slice(0, 3).map((causesData, item) => {
                            return (
                                <div className="col-lg-4 col-md-6 col-12" key={item}>
                                    {/* Main Card Container */}
                                    <div className="cause-card">
                                        {/* Image Area with Overlays */}
                                        <div className="cause-card-image">
                                            <Image src={causesData.Cimg} alt={causesData.title} layout="fill" objectFit="cover" />

                                            {/* Orange Icon Overlay (Hidden by default) */}
                                            <div className="cause-icon-hover-overlay">
                                                <Link onClick={ClickHandler} href={`/causes/${causesData.slug}`}>
                                                    <svg viewBox="0 0 98 99" fill="none">
                                                        <path
                                                            d="M0 0H98V99C98 99 61.8947 91.6967 42.5526 55.9918C23.2105 20.2869 0 0 0 0Z"
                                                            fill="#f6951d"
                                                        />
                                                    </svg>
                                                </Link>
                                            </div>

                                            {/* Blue Title Container */}
                                            <div className="cause-title-container">
                                                <i className="flaticon-globe"></i>
                                                <h3 className="cause-card-title">
                                                    {causesData.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Text Content Below the Image */}
                                        <div className="cause-card-content">
                                            {/* Changed the order of the paragraphs */}
                                            <p className="cause-description-text">{causesData.docomunt}</p>
<p
    className="cause-stats-text"
    dangerouslySetInnerHTML={{ __html: causesData.statsText }}
/>                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <Scrollbar />
        </Fragment>
    );
};

export default CausesPage;