// src/components/Header/NewHeader.jsx

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './newheader.module.scss';

const NewHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false); // New state for search

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen);
        // You would add your search input toggle logic here
        // For now, this will simply change the state
        console.log('Search button clicked!');
    };

    const renderDesktopHeader = () => (
        <header className={`${styles.newHeader} ${styles.desktopHeader}`}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <img src="/images/logo-2.svg" alt="Ghines Foundation Logo" />
                </Link>
            </div>
            <nav className={styles.newNav}>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">Who We Are</Link></li>
                    <li><Link href="/services">What We Do</Link></li>
                    <li><Link href="/board">Our Leadership</Link></li>
                    <li><Link href="/resources">Resources</Link></li>
                    <li><Link href="/gallery">Gallery</Link></li>
                    <li><Link href="/blog-fullwidth">News & Stories</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
            <div className={styles.ctaButton}>
                <Link href="" className={styles.donateBtn}>
                    Get Involved
                </Link>
                <button className={styles.searchBtn} onClick={handleSearchClick}>
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </header>
    );

    const renderMobileHeader = () => (
        <header className={`${styles.newHeader} ${styles.mobileHeader}`}>
            <div className={styles.mobileLogoAndToggle}>
                <div className={styles.logoMobileHeader}>
                    <Link href="/">
                        <img src="/images/logo-2.svg" alt="Ghines Foundation Logo" />
                    </Link>
                </div>
                <button className={styles.mobileMenuToggle} onClick={toggleMenu}>
                    <i className="fa fa-bars"></i>
                </button>
            </div>
            <nav className={`${styles.newNav} ${isMenuOpen ? styles.mobileMenuActive : ''}`}>
                <div className={styles.logoMobile}>
                    <img src="/images/logo-2.svg" alt="Ghines Foundation Logo" />
                    <button className={styles.mobileMenuClose} onClick={closeMenu}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>
                {/* Add search button inside mobile nav for better positioning */}
                <ul className={styles.mobileNavLinks}>
                    <li className={styles.searchItem}>
                        <button className={styles.searchBtnMobile} onClick={handleSearchClick}>
                            <i className="fa fa-search"></i>
                            <span>Search</span>
                        </button>
                    </li>
                    <li><Link href="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link href="/about" onClick={closeMenu}>Who We Are</Link></li>
                    <li><Link href="/services" onClick={closeMenu}>What We Do</Link></li>
                    <li><Link href="/board" onClick={closeMenu}>Our Leadership</Link></li>
                    <li><Link href="/resources" onClick={closeMenu}>Resources</Link></li>
                    <li><Link href="/gallery" onClick={closeMenu}>Gallery</Link></li>
                    <li><Link href="/blog-fullwidth" onClick={closeMenu}>News & Stories</Link></li>
                    <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
                    <li><Link href="/get-involved" onClick={closeMenu}>Get Involved</Link></li>
                </ul>
            </nav>
        </header>
    );

    return isMobile ? renderMobileHeader() : renderDesktopHeader();
};

export default NewHeader;