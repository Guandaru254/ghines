// components/about2/about2.jsx

import React from 'react';
import Image from 'next/image';

const AboutS2 = (props) => {
    return (
        <section className={"" + props.hclass}>
            <div className="container">
                {/* Section 1: Vision & Mission (Full Width) */}
                <div className='row justify-content-center'>
                    <div className='col-lg-10 col-md-12 text-center mission-statement mb-5'>
                        <div className='mission-card'>
                            <h2>VISION & MISSION</h2>
                            <p>We envision a thriving South Sudan where people, animals, and culture coexist in harmony and dignity. Our mission is to drive transformative change by advancing animal welfare, enabling trauma recovery and justice, and empowering young people through culture, sports, and training. We are committed to creating pathways for dignity, resilience, and opportunity, built from within communities and led by those most affected.</p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Our Identity (Image and Text in a Row) */}
                <div className="row align-items-center">
                    <div className="col-lg-6 col-12">
                        <div className="about-image">
                            <Image
                                src="/images/logo-2.svg"
                                alt="Ghines Foundation Introduction Image"
                                width={500}
                                height={350}
                                style={{ borderRadius: '15px' }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="right-content">
                            <h2>OUR IDENTITY</h2>
                            <p>The Ghines Foundation is a nonprofit organisation based in South Sudan, dedicated to transforming the country's approach to healing, growth, and defining its future. Our vision is shaped by the legacy of the late Mr. Ghines, a respected conservationist who championed people, animals, sports and culture as interconnected pillars of wellbeing.</p>
                            <p>The dignity and well-being of South Sudan’s people, animals, and ecosystems are shaped by interlinked crises—from the scars of conflict and cultural erosion to biodiversity loss and youth disempowerment. These challenges are not isolated; they reflect broader global concerns, which are anchored in the Sustainable Development Goals (SDGs) and the Paris Climate Agreement.</p>
                            <p>At the Ghines Foundation, we recognise that the path to a peaceful, just, and sustainable future must address these intersections. We focus on issues with transformative potential, identify emerging risks, and champion bold, community-led solutions that restore harmony between people, culture, and nature.</p>
                            <p className="tagline">Every action, big or small, counts!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutS2;