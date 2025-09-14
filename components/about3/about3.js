// AboutS2.jsx

import React from 'react';
import Image from 'next/image';

import GhinesPhoto from '/public/images/about/ghines.jpg';

const AboutS2 = (props) => {
    return (
        <section className={"" + props.hclass}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-12">
                        {/* The fix is to use a semantic figure and figcaption */}
                        <figure className="about-image-figure">
                            <Image
                                src={GhinesPhoto}
                                alt="Ghines Foundation Introduction Image"
                                width={500}
                                height={350}
                                style={{ borderRadius: '15px' }}
                            />
                            <figcaption className="about-image-caption">
                                Mr. Nicholas Ghines
                            </figcaption>
                        </figure>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="right-content">
                            <h2>The Ghines Legacy</h2>
                            <p>
                                The story of the Ghines family in South Sudan begins more than a century ago. 
                                In 1896, members of the family left Ottoman-occupied Greece and made their way to Sudan,
                                a land that, at the time, shared the same empire as northern Greece. Years later, after 
                                serving in the North African campaigns of World War II, Nicholas C. Ghines returned to Sudan 
                                and visited Juba for the very first time. 
                            </p>
                            <p>
                                What he found there changed the course of his life: a vibrant Greek community and an
                                untouched natural world alive with the sounds of birds, wild animals, and
                                the rhythm of the Nile. Nicholas was captivated. He decided not to return north,
                                but instead to build a home in Juba.
                            </p>
                            <p>
                                It was here that his true calling revealed itself. With an unshakable love for animals,
                                Nicholas transformed his own home into South Sudan’s very first wildlife orphanage. 
                                What began as a few rescued creatures soon grew, in partnership with the Game Department of Juba, 
                                into a small zoo that became a place of wonder for the community. He often said, 
                                “I trust animals more than humans,” a reflection of his deep understanding of their needs and behaviours.
                            </p>
                            <p>
                                From this devotion was born a family legacy that has lasted through generations. George N. 
                                Ghines, his son, carried this spirit forward. In his name, the Ghines Foundation was created, 
                                a living tribute to a family that believed in protecting animals, uplifting communities, 
                                and preserving culture.
                            </p>
                            <p>Today, the Foundation’s work honors both father and son: its Animal Welfare and Conservation
                                pillar is dedicated to Nicholas, the pioneer who saw animals as equals in dignity, 
                                while the wider mission of empowering youth, strengthening culture, and advancing 
                                human rights reflects George’s vision for a South Sudan where people, nature, 
                                and heritage thrive together.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutS2;