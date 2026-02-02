// components/Scrollbar.js

import React, { useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FaArrowUp } from 'react-icons/fa'; // Assuming you have this icon or a similar one

const Scrollbar = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show the button when the user scrolls down 300px
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Add the scroll event listener
        window.addEventListener('scroll', toggleVisibility);

        // Clean up the listener when the component unmounts
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="col-lg-12">
            <div className="header-menu">
                {isVisible && (
                    <ul className="smothscroll">
                        {/* We use a regular anchor tag with an onClick handler */}
                        <li>
                            <AnchorLink href="#__next" onClick={scrollToTop}>
                                <FaArrowUp />
                            </AnchorLink>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Scrollbar;