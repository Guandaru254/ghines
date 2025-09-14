// src/components/GetInvolved/GetInvolved.jsx

import React, { Fragment } from 'react';
import PageTitle from '../pagetitle/PageTitle';
import Layout from '../Layout/Layout';
import Scrollbar from '../scrollbar/scrollbar';

const GetInvolved = () => {
    return (
        <Fragment>
            <Layout>
                <PageTitle pageTitle={'Get Involved'} pagesub={'Join Our Mission'} />

                <section className="get-involved-section section-padding">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-12">
                                <div className="get-involved-intro">
                                    <h2 className="section-title">Whether it's supporting our work on the ground, learning about our model, or partnering with us to build programs from the ground up, we want you involved. We’re building a new future for South Sudan, rooted in dignity, justice, sports and creativity. Help us make it.</h2>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center mt-5">
                            <div className="col-lg-8 col-md-10">
                                <ul className="get-involved-list">
                                    <li>
                                        <h3>Partner With Us</h3>
                                        <p>Collaborate on field-based programs, digital initiatives, or advocacy campaigns.</p>
                                    </li>
                                    <li>
                                        <h3>Support Infrastructure</h3>
                                        <p>Help us build and equip mobile clinics, an arts centre, and a sports ground.</p>
                                    </li>
                                    <li>
                                        <h3>Sponsor a Program</h3>
                                        <p>Fund trauma recovery workshops, animal welfare interventions, or youth creative labs.</p>
                                    </li>
                                    <li>
                                        <h3>Volunteer or Intern</h3>
                                        <p>Contribute skills in media, research, education, law, or health.</p>
                                    </li>
                                    <li>
                                        <h3>Join Our Network</h3>
                                        <p>Stay connected through our newsletter as a friend, funder, or ambassador of the Foundation’s mission.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <Scrollbar />
            </Layout>
        </Fragment>
    );
};

export default GetInvolved;