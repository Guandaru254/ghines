// Footer.jsx

import React, { useState } from 'react';
import Link from 'next/link';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRssSquare } from "react-icons/fa"; // Import the RSS icon

import shape1 from '/public/images/f-shape1.svg';
import shape2 from '/public/images/f-shape-2.svg';
import shape3 from '/public/images/f-shape3.svg';
import shape4 from '/public/images/f-shape4.svg';
import Image from 'next/image';

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const Footer = (props) => {
    const [email, setEmail] = useState('');

    const handleReset = () => {
        setEmail('');
    };

    return (
        <footer className="wpo-site-footer">
            <div className="wpo-upper-footer">
                <div className="container">
                    <div className="row footer-main-content"> {/* Use a class for better targeting */}
                        {/* Newsletter Column */}
                        <div className="col col-lg-6 col-md-6 col-sm-12 col-12 newsletter-column">
                            <div className="widget newsletter-s2">
                                <div className="widget-title">
                                    <h3>JOIN OUR NEWSLETTER</h3>
                                </div>
                                <p>Stay informed about our impactful work and how <br /> your support makes a difference in South Sudan.</p>
                                <form className="form-fild">
                                    <input
                                        className="fild"
                                        type="email"
                                        placeholder="Your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button type="submit" onClick={handleReset}>
                                        <i className="flaticon-right-arrow"></i>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Social Media & RSS Column */}
                        <div className="col col-lg-6 col-md-6 col-sm-12 col-12 social-media-column">
                            <div className="widget locations-widget">
                                <div className="social-media-icons">
                                    <a href="https://web.facebook.com/profile.php?id=61580686119461" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                                    <a href="https://www.linkedin.com/company/109105147" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                                    <a href="/api/rss.xml" target="_blank" rel="noopener noreferrer" className="rss-icon"><FaRssSquare /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The new separator */}
                    <div className="footer-separator"></div>

                    {/* Lower Footer Content now inside upper footer */}
                    <div className="row">
                        <div className="col col-xs-12">
                            <div className="lower-footer-content">
                                <p className="copyright">
                                    &copy; {new Date().getFullYear()} Ghines Foundation. All rights reserved.
                                </p>
                                <ul className="footer-legal-links">
                                    <li><Link href="/privacypolicy/privacypolicy">PRIVACY POLICY</Link></li>
                                    <li><Link href="/termsofuse/termsofuse">TERMS OF USE</Link></li>
                                    <li><Link href="/contact">CONTACT</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;