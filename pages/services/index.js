// pages/causes.jsx

import React, { Fragment } from 'react';
import Image from 'next/image';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import causes from '../../api/causes';

const CausesPage = () => {
    return (
        <Fragment>
            <PageTitle pageTitle={'What We Do'} />
            <section className="cause-pg-section section-padding">
                <div className="container">
                    <div className="row">
                        {causes.slice(0, 3).map((causesData, item) => {
                            return (
                                <div className="col-lg-4 col-md-6 col-12" key={item}>
                                    <div className="causes-card">
                                        <div className="image">
                                            <span>{causesData.tag}</span>
                                            <Image src={causesData.Cimg} alt={causesData.title} width={400} height={300} />
                                        </div>
                                        <div className="text">
                                            <h2 className="causes-card-title">
                                                <span className="causes-card-main-title" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                                    {causesData.title}
                                                </span>
                                            </h2>
                                            <p className="stats-text" style={{ color: '#4A9FDA', marginTop: '5px' }}>
                                                {causesData.statsText}
                                            </p>
                                            <p className="causes-card-description" style={{ paddingTop: '15px' }}>
                                                {causesData.docomunt}
                                            </p>
                                        </div>
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