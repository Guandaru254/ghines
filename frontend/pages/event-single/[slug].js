// pages/pillars/[slug].jsx

import React from 'react';
import { useRouter } from 'next/router';
import pillars from '../../api/pillars';
import Image from 'next/image';
import Head from 'next/head';

const PillarSinglePage = () => {
    const router = useRouter();
    const { slug } = router.query;

    const currentPillar = pillars.find(item => item.slug === slug);

    if (!currentPillar) {
        return <div>Pillar not found.</div>;
    }

    return (
        <>
            <Head>
                <title>{currentPillar.title} | The Ghines Foundation</title>
                <meta name="description" content={currentPillar.description} />
            </Head>

            <section className="pillar-details section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <div className="pillar-image-container">
                                <Image
                                    src={currentPillar.img}
                                    alt={currentPillar.title}
                                    width={600}
                                    height={400}
                                    layout="responsive"
                                    objectFit="cover"
                                    quality={80}
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="pillar-content-text">
                                <h1 className="pillar-title">{currentPillar.title}</h1>
                                <p>{currentPillar.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PillarSinglePage;