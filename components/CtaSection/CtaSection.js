import React from 'react';
import Link from 'next/link';
import NextImage from 'next/image';

// Import the image files
import Shape from '/public/images/cta-shap.svg';
import Shape2 from '/public/images/curved_shape.svg';
import Shape3 from '/public/images/arrow1.svg';
import CtaImage from '/public/images/cta/1.jpg'; // Path should be from the root

const ClickHandler = () => {
    window.scrollTo(10, 0);
};

const CtaSection = (props) => {
    return (
        <section className={"cta-section " + props.hclass}>
            <div className="cta-image-background">
                <NextImage
                    src={CtaImage}
                    alt="Children need help"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>
            <div className="container cta-content-overlay">
                <div className="content">
                    <span>Compassion in Action: Join Us Today</span>
                    <h3>children need your help by donating today</h3>
                    <Link onClick={ClickHandler} href="/become-volunteer" className="theme-btn">
                        become a volunteer
                    </Link>
                </div>
            </div>
            <div className="shape">
                <NextImage src={Shape} alt="Shape" />
            </div>
            <div className="shape-1">
                <NextImage src={Shape2} alt="Shape2" />
            </div>
            <div className="shape-2">
                <NextImage src={Shape3} alt="Shape3" />
            </div>
        </section>
    );
};

export default CtaSection;