// pages/causes.jsx

import React, { Fragment } from 'react';
import Image from 'next/image';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import causes from '../../api/causes'; // This is the data file you provided

const CausesPage = () => {
    return (
        <Fragment>
            <PageTitle pageTitle={'Our Work'} />
            <section className="cause-pg-section section-padding">
                <div className="container">
                    <div className="row">
                        {causes.slice(0, 3).map((causesData, item) => {
                            const [mainTitle, statsText] = causesData.title.split(' - '); // Splits the title and stats
                            return (
                                <div className="col-lg-4 col-md-6 col-12" key={item}>
                                    <div className="causes-card">
                                        <div className="image">
                                            <span>{causesData.tag}</span>
                                            <Image src={causesData.Cimg} alt={mainTitle} width={400} height={300} />
                                        </div>
                                        <div className="text">
                                            <h2 className="causes-card-title"> {/* Added a new class here */}
                                                <span>{mainTitle}</span> {/* Keeps the title unclickable */}
                                            </h2>
                                            {/* Descriptive text formatted as an italic quote */}
                                            <p className="causes-card-description">{causesData.docomunt}</p> {/* Original description */}
                                            <p className="stats-text">{statsText}</p> {/* Stats text with lighter font */}
                                        </div>
                                        <div className="progress-wrap">
                                            <div className="progress-item">
                                                <div className="progress">
                                                    <div className="bar" style={{ width: `0%` }}>
                                                        <span className="cssProgress-label">0%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul>
                                                <li>
                                                    <span className="title">Start:</span>
                                                    <span>$0</span>
                                                </li>
                                                <li>
                                                    <span className="title">Raised:</span>
                                                    <span>$0</span>
                                                </li>
                                                <li>
                                                    <span className="title">Goal:</span>
                                                    <span>$0</span>
                                                </li>
                                            </ul>
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