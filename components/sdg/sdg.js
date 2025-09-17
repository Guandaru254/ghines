// src/components/SDG.jsx

import React from 'react';
import Image from 'next/image';

// Correct file paths to import images.
import sdg3_icon from '/public/images/sdgs/sdg3.jpg';
import sdg4_icon from '/public/images/sdgs/sdg4.jpg';
import sdg8_icon from '/public/images/sdgs/sdg8.jpg';
import sdg15_icon from '/public/images/sdgs/sdg15.jpg';
import sdg16_icon from '/public/images/sdgs/sdg16.jpg';

const SDG = () => {
    const goals = [
        { id: 3, title: 'Good Health and Well-being', className: 'sdg-3', icon: sdg3_icon },
        { id: 4, title: 'Quality Education', className: 'sdg-4', icon: sdg4_icon },
        { id: 8, title: 'Decent Work & Economic Growth', className: 'sdg-8', icon: sdg8_icon },
        { id: 15, title: 'Life on Land', className: 'sdg-15', icon: sdg15_icon },
        { id: 16, title: 'Peace, Justice and Strong Institutions', className: 'sdg-16', icon: sdg16_icon },
    ];

    return (
        <section className="sdg-goals-section">
            <div className="container">
                <h2 className="section-title">Our Top 5 SDG Goals</h2>
                <div className="sdg-grid">
                    {goals.map(goal => (
                        <div key={goal.id} className="sdg-block">
                            <div className="sdg-icon">
                                <Image
                                    src={goal.icon}
                                    alt={goal.title}
                                    width={110}
                                    height={110}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SDG;