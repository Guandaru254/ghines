// pages/pillars/[slug].jsx

import React from 'react';
import { useRouter } from 'next/router';
import pillars from '../../api/pillars';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

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

            {/* Main Content Section with new design */}
            <section className="pillar-details section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="pillar-title">{currentPillar.title}</h1>
                        </div>
                    </div>
                    <div className="row mt-4">
                        {/* Image Column */}
                        <div className="col-md-5 mb-4 mb-md-0">
                            <div className="pillar-image-container">
                                <Image
                                    src={currentPillar.img}
                                    alt={currentPillar.title}
                                    width={400}
                                    height={250}
                                    layout="responsive"
                                    objectFit="cover"
                                    quality={80}
                                />
                            </div>
                        </div>

                        {/* Text Content Column */}
                        <div className="col-md-7">
                            <div className="pillar-content-text">
                                <p>{currentPillar.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Pillars Section */}
                    <div className="row mt-5">
                        <div className="col-12 text-center">
                            <h2 className="related-pillars-title">Related Pillars</h2>
                        </div>
                        {pillars.filter(p => p.slug !== currentPillar.slug).map(p => (
                            <div className="col-md-4 mb-4" key={p.slug}>
                                <div className="related-pillar-card">
                                    <Link href={`/pillars/${p.slug}`}>
                                        <div className="related-pillar-img-container">
                                            <Image
                                                src={p.img}
                                                alt={p.title}
                                                width={300}
                                                height={200}
                                                layout="responsive"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <h4 className="related-pillar-card-title">{p.title}</h4>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default PillarSinglePage;