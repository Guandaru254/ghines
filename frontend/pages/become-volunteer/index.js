import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle'
import BecomeVolunteerForm from '../../components/BecomeVolunteerForm/BecomeVolunteerForm'
import Scrollbar from '../../components/scrollbar/scrollbar';
import Logo from '/public/images/logo-2.svg'
import Bgimg from '/public/images/volunteer.jpg'
import Image from 'next/image';

const HomePage4 = () => {
    return (
        <Fragment>
            <PageTitle pageTitle={'Become Volunteer'} />
            <div className="volunteer-area">
                <div className="volunteer-wrap">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="volunteer-item">
                                    <div className="volunteer-img-wrap">
                                        <div className="volunter-img">
                                            <Image src={Bgimg} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="volunteer-contact">
                                    <div className="volunteer-contact-form">
                                        <h2>Become a Volunteer</h2>
                                        <BecomeVolunteerForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Scrollbar />
        </Fragment>
    )
};
export default HomePage4;