// components/CausesSectionS4/CausesSectionS4.js

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import causes from '../../api/causes';

const CausesSectionS4 = () => {
    return (
        <section className="causes-section section-padding">
            <div className="container">
                <div className="row">
                    {causes.slice(0, 3).map((causesData, item) => {
                        return (
                            <div className="col-lg-4 col-md-6 col-12" key={item}>
                                <div className="causes-card">
                                    <div className="image">
                                        <span>{causesData.tag}</span>
                                        <Image src={causesData.Cimg} alt={causesData.title} width={400} height={300} />
                                    </div>
                                    <div className="text" style={{ padding: '25px 15px', paddingTop: '10px', textAlign: 'center' }}>
                                        <h2 className="causes-card-title">
                                            <span 
                                                className="causes-card-main-title" 
                                                style={{ 
                                                    fontSize: '20px', 
                                                    color: '#000', 
                                                    fontFamily: '"Nunito", sans-serif', 
                                                    fontWeight: '600' 
                                                }}
                                            >
                                                {causesData.title}
                                            </span>
                                        </h2>
                                        <p className="stats-text" style={{ color: '#4A9FDA', marginTop: '5px' }}>
                                            {causesData.statsText}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Single, Centered "Learn More" Button */}
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Link href="/causes" passHref>
                        <div className="theme-btn learn-more-btn" style={{
                            backgroundColor: '#4A9FDA',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: '25px', 
                            fontWeight: 'bold',
                            display: 'inline-block',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}>
                            Learn More
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CausesSectionS4;