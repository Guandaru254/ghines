// src/components/Header/NewHeader.jsx

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head'; // Import the Head component
import styles from './newheader.module.scss';

const NewHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

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
        if (isSearchOpen) {
            setIsSearchOpen(false);
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    const SearchOverlay = () => (
        <div className={styles.searchOverlay}>
            <div className={styles.searchContent}>
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.searchInput}
                />
                <button className={styles.closeSearchBtn} onClick={handleSearchClick}>
                    <i className="fa fa-times"></i>
                </button>
            </div>
        </div>
    );

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
                    <li><Link href="/board">Leadership</Link></li>
                    <li><Link href="/resources">Resources</Link></li>
                    <li><Link href="/blog-fullwidth">News & Stories</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
            <div className={styles.ctaButton}>
                <Link href="/get-involved" className={styles.donateBtn}>
                    Get Involved
                </Link>
                <button className={styles.searchBtn} onClick={handleSearchClick}>
                    <i className="fa fa-search"></i>
                </button>
            </div>
            {isSearchOpen && <SearchOverlay />}
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
                {/* Remove search button from here */}
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
                <ul className={styles.mobileNavLinks}>
                    <li><Link href="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link href="/about" onClick={closeMenu}>Who We Are</Link></li>
                    <li><Link href="/services" onClick={closeMenu}>What We Do</Link></li>
                    <li><Link href="/board" onClick={closeMenu}>Leadership</Link></li>
                    <li><Link href="/resources" onClick={closeMenu}>Resources</Link></li>
                    <li><Link href="/blog-fullwidth" onClick={closeMenu}>News & Stories</Link></li>
                    <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
                    <li><Link href="/get-involved" onClick={closeMenu}>Get Involved</Link></li>
                    {/* Place search button at the bottom of the list */}
                    <li className={styles.searchItem}>
                        <button className={styles.searchBtnMobile} onClick={handleSearchClick}>
                            <i className="fa fa-search"></i>
                            <span>Search</span>
                        </button>
                    </li>
                </ul>
            </nav>
            {isSearchOpen && <SearchOverlay />}
        </header>
    );

    return (
        <>
            {/* Add the Head component with the RSS link here */}
            <Head>
                <link 
                    rel="alternate" 
                    type="application/rss+xml" 
                    title="The Ghines Foundation Blog Feed" 
                    href="/api/rss.xml" 
                />
            </Head>
            {isMobile ? renderMobileHeader() : renderDesktopHeader()}
        </>
    );
};

export default NewHeader;