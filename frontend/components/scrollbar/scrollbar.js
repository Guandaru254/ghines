// components/Scrollbar.js

import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const Scrollbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="col-lg-12">
      <div className="header-menu">
        {isVisible && (
          <ul className="smothscroll">
            <li>
              {/* Using a normal anchor + JS smooth scroll */}
              <a
                href="#top"
                onClick={scrollToTop}
                aria-label="Scroll to top"
              >
                <FaArrowUp />
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Scrollbar