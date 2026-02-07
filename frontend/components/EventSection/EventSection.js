import React from 'react';
import pillars from '../../api/pillars';
import Link from 'next/link';
import Image from 'next/image';

const ClickHandler = () => {
    window.scrollTo(10, 0);
};

const EventSection = () => {
    return (
        <section className="MV-section" style={{ padding: '60px 0 80px 0', background: '#fff' }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#000' }}>Our Pillars</h2>
                </div>
                
                <div className="row g-4">
                    {pillars.map((pillaritem, index) => (
                        <div className="col-xl-4 col-lg-6 col-md-6 col-12" key={index} style={{ marginBottom: '40px' }}>
                            <div className="pillar-card-wrapper" style={{ position: 'relative' }}>
                                
                                {/* 1. The Main Image - Rectangular (0 radius) */}
                                <div style={{ 
                                    position: 'relative', 
                                    height: '280px', 
                                    width: '100%',
                                    borderRadius: '0px', 
                                    overflow: 'hidden',
                                    zIndex: 1 
                                }}>
                                    <Image 
                                        src={pillaritem.img} 
                                        alt={pillaritem.title} 
                                        layout="fill" 
                                        objectFit="cover" 
                                    />
                                </div>

                                {/* 2. The Blue Card - Floating, Overlapping Image Bottom */}
                                <div style={{ 
                                    position: 'absolute',
                                    bottom: '-20px', 
                                    left: '20px',    // Creating the side gutter
                                    right: '20px',   // Creating the side gutter
                                    backgroundColor: '#4a9fda',
                                    padding: '20px 10px',
                                    borderRadius: '0px', 
                                    zIndex: '3',
                                    textAlign: 'center',
                                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                                }}>
                                    <h2 style={{ margin: 0 }}>
                                        <Link 
                                            onClick={ClickHandler} 
                                            href={`/pillars/${pillaritem.slug}`} 
                                            style={{ 
                                                color: '#fff', 
                                                fontSize: '15px', 
                                                fontWeight: '700',
                                                textDecoration: 'none',
                                                display: 'block',
                                                textTransform: 'none'
                                            }}
                                        >
                                            {pillaritem.title}
                                        </Link>
                                    </h2>
                                </div>

                                {/* 3. The Orange Box - Flush with the Blue Card's Left Edge */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-20px', // Matches the Blue Card bottom
                                    left: '20px',   // Matches the Blue Card left
                                    width: '45px',
                                    height: '45px',
                                    backgroundColor: '#f6951d',
                                    zIndex: '4',
                                    borderRadius: '0px'
                                }}></div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .pillar-card-wrapper {
                    transition: transform 0.3s ease;
                }
                .pillar-card-wrapper:hover {
                    transform: translateY(-5px);
                }
            `}</style>
        </section>
    );
};

export default EventSection;