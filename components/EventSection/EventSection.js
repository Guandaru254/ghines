// EventSection.jsx

import React from 'react';
import pillars from '../../api/pillars';
import Link from 'next/link';
import Image from 'next/image';

const ClickHandler = () => {
    window.scrollTo(10, 0);
};

const EventSection = () => {
    return (
        <section className="MV-section">
            <div className="container-fluid">
                <div className="text-center mb-5">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'Nunito, sans-serif', color: 'black' }}>Our Pillars</h2>
                </div>
            </div>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    {pillars.map((pillaritem, index) => (
                        <div className="col-xl-4 col-lg-6 col-md-6 col-12" key={index}>
                            <div className="card-mv">
                                <div style={{ position: 'relative', height: '300px' }}>
                                    <Image src={pillaritem.img} alt={pillaritem.title} layout="fill" objectFit="cover" />
                                </div>
                                <div className="icon">
                                    <Link onClick={ClickHandler} href={`/pillars/${pillaritem.slug}`}>
                                        <i>+</i>
                                        <div className="shape">
                                            <svg viewBox="0 0 98 99" fill="none">
                                                <path
                                                    d="M0 0H98V99C98 99 61.8947 91.6967 42.5526 55.9918C23.2105 20.2869 0 0 0 0Z"
                                                    fill="#F74F22"
                                                />
                                            </svg>
                                        </div>
                                    </Link>
                                </div>
                                <div className="text">
                                    <h2>
                                        <Link onClick={ClickHandler} href={`/pillars/${pillaritem.slug}`}>
                                            {pillaritem.title}
                                        </Link>
                                    </h2>
                                    <i className="flaticon-globe"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventSection;