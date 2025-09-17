// components/TermsofUse.js

import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle'; // Make sure this component exists
import Scrollbar from '../../components/scrollbar/scrollbar';

const TermsofUse = () => {
    return (
        <Fragment>
            <section className="legal-section section-padding">
                <div className="container">
                    <div className="legal-content">
                        <p>
                            Welcome to the Ghines Foundation website. By accessing or using our site, you agree to be bound by these Terms of Use. Please read them carefully.
                        </p>
                        
                        <h3>1. Acceptance of Terms</h3>
                        <p>
                            By using this website, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, you should not use this site.
                        </p>

                        <h3>2. Use of Site Content</h3>
                        <p>
                            All content on this website, including text, graphics, logos, and images, is the property of the Ghines Foundation and is protected by copyright laws. You may not use, reproduce, or distribute any content without our express written permission.
                        </p>

                        <h3>3. Disclaimer of Warranties</h3>
                        <p>
                            This website is provided on an "as-is" and "as-available" basis. We make no warranties, express or implied, regarding the operation or availability of the site or the information, content, or materials included on the site.
                        </p>

                        <h3>4. Limitation of Liability</h3>
                        <p>
                            The Ghines Foundation will not be liable for any damages of any kind arising from the use of this site, including, but not limited to, direct, indirect, incidental, punitive, and consequential damages.
                        </p>
                    </div>
                </div>
            </section>
            <Scrollbar />
        </Fragment>
    );
};

export default TermsofUse;