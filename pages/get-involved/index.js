// pages/get-involved/index.js

import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Link from 'next/link';

const GetInvolvedPage = () => {
    return (
        <Fragment>
            <PageTitle pageTitle={'Get Involved'} />
            <section className="get-involved-section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10 col-12 text-center">
                            <div className="intro-text">
                                <p className="section-description">Whether it’s supporting our work on the ground, learning about our model, or partnering with us to build programs from the ground up, we want you involved. We’re building a new future for South Sudan, rooted in dignity, justice, sports and creativity. Help us make it.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row g-4 get-involved-options">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="option-card">
                                <h3>Partner With Us</h3>
                                <p>Collaborate on field-based programs, digital initiatives, or advocacy campaigns.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="option-card">
                                <h3>Support Infrastructure</h3>
                                <p>Help us build and equip mobile clinics, an arts centre, and a sports ground.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="option-card">
                                <h3>Sponsor a Program</h3>
                                <p>Fund trauma recovery workshops, animal welfare interventions, or youth creative labs.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="option-card">
                                <h3>Volunteer or Intern</h3>
                                <p>Contribute skills in media, research, education, law, or health.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* New button section */}
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <div className="get-involved-cta">
                                <Link href="/contact" className="get-involved-btn">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Scrollbar />
        </Fragment>
    );
};

export default GetInvolvedPage;