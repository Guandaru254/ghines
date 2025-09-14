import React from 'react';
import ContactForm from '../ContactFrom/ContactForm'


const Contactpage = () => {

    return(
        <section className="contact-page section-padding">
            <div className="container">
                <div className="office-info">
                    <div className="row">
                        <div className="col col-lg-4 col-md-6 col-12">
                            <div className="office-info-item">
                                <div className="office-info-icon">
                                    <div className="icon">
                                        <i className="fi flaticon-home-address"></i>
                                    </div>
                                </div>
                                <div className="office-info-text">
                                    <h2>Our Address</h2>
                                    <p>Juba, South Sudan</p>
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-4 col-md-6 col-12">
                            <div className="office-info-item active">
                                <div className="office-info-icon">
                                    <div className="icon">
                                        <i className="fi flaticon-phone-call"></i>
                                    </div>
                                </div>
                                <div className="office-info-text">
                                    <h2>Phone Number</h2>
                                    <p>+211 912 345 678</p>
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-4 col-md-6 col-12">
                            <div className="office-info-item">
                                <div className="office-info-icon">
                                    <div className="icon">
                                        <i className="fi flaticon-mail-1"></i>
                                    </div>
                                </div>
                                <div className="office-info-text">
                                    <h2>Email</h2>
                                    <p>info@ghinesfoundation.org</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-wrap">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="contact-left">
                                <h2>Get in touch</h2>
                                <p>Every action, big or small, counts!</p>
                                <div className="map">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127214.99552926265!2d31.494613249122825!3d4.860857434133812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1712804abcf3b5f9%3A0xd89839286346c433!2sJuba%2C%20South%20Sudan!5e0!3m2!1sen!2ske!4v1756109865732!5m2!1sen!2ske" referrerpolicy="no-referrer-when-downgrade"                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="contact-right">
                                <div className="title">
                                    <h2>Fill Up The Form</h2>
                                    <p>Your email address will not be published. Required fields are marked *</p>
                                </div>
                                <ContactForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )
        
}

export default Contactpage;