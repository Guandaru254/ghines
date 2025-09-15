// pages/pillars/[slug].jsx

import React from 'react';
import { useRouter } from 'next/router';
import pillars from '../../api/pillars';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

// Import the new CSS module
import styles from '../../styles/sass/components/pillar-single.module.scss';

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
            <section className={`${styles.pillarDetails} section-padding`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className={styles.pillarTitle}>{currentPillar.title}</h1>
                        </div>
                    </div>
                    <div className="row mt-4">
                        {/* Image Column */}
                        <div className="col-md-5 mb-4 mb-md-0">
                            <div className={styles.pillarImageContainer}>
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
                            <div className={styles.pillarContentText}>
                                <p>{currentPillar.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Pillars Section */}
                    <div className={`row mt-5 ${styles.relatedPillarsSection}`}>
                        <div className="col-12 text-center">
                            <h2 className={styles.relatedPillarsTitle}>Related Pillars</h2>
                        </div>
                        {pillars.filter(p => p.slug !== currentPillar.slug).map(p => (
                            <div className="col-md-4 mb-4" key={p.slug}>
                                <div className={styles.relatedPillarCard}>
                                    <Link href={`/pillars/${p.slug}`}>
                                        <div className={styles.relatedPillarImgContainer}>
                                            <Image
                                                src={p.img}
                                                alt={p.title}
                                                width={300}
                                                height={200}
                                                layout="responsive"
                                                objectFit="cover"
                                                quality={80}
                                            />
                                        </div>
                                        <h4 className={styles.relatedPillarCardTitle}>{p.title}</h4>
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