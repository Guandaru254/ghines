// components/PrivacyPolicy.js

import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle'; // Make sure this component exists
import Scrollbar from '../../components/scrollbar/scrollbar';

const PrivacyPolicy = () => {
    return (
        <Fragment>
            <section className="legal-section section-padding">
                <div className="container">
                    <div className="legal-content">
                        <p>
                            The Ghines Foundation is dedicated to protecting the privacy and security of all visitors to our website and participants in our programs. The following policy outlines our approach to data management.
                        </p>

                        <h3>Data Collection and Use</h3>
                        <p>
                            We monitor general website trends to improve functionality and user experience. We do not track individual visitors unless information is voluntarily shared, such as through sign-up forms.
                        </p>
                        <p>
                            Any personally identifiable information, including names, emails, phone numbers, or donor data, is securely stored and used only for its intended purpose. We do not sell, rent, or share personal data with third parties.
                        </p>
                        <p>
                            Occasionally, we may use aggregate, non-personal information for internal learning or to generate reports for donors.
                        </p>
                        <p>
                            You can choose to unsubscribe or opt out of any communication from us at any time.
                        </p>

                        <h3>Cookies</h3>
                        <p>
                            Our website uses cookies, which are small text files placed on your device, to enhance your experience, analyze site traffic, and improve site functionality. These cookies help us understand which pages are most engaging and allow us to better tailor our content.
                        </p>
                        <p>
                            You have the option to disable cookies through your browser settings at any time without affecting your access to our site.
                        </p>

                        <h3>Compliance and External Links</h3>
                        <p>
                            We comply with relevant data protection laws, including South Sudan’s emerging frameworks and applicable international standards.
                        </p>
                        <p>
                            For donor information, we ensure confidentiality, and no financial information is ever published or exchanged without your consent.
                        </p>
                        <p>
                            This privacy policy applies only to Ghines Foundation platforms and communications. Links to external sites are subject to their own privacy practices.
                        </p>
                    </div>
                </div>
            </section>
            <Scrollbar />
        </Fragment>
    );
};

export default PrivacyPolicy;