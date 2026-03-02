import React, { Fragment } from 'react';
import Head from 'next/head'; 
import Hero from '../components/hero/hero';
import EventSection from '../components/EventSection/EventSection';
import BlogPreview from '../components/BlogPreview/BlogPreview';
import Footer from '../components/footer/Footer'; 
import Scrollbar from '../components/scrollbar/scrollbar';
import { getAllNews, urlFor } from '../lib/sanity';

const HomePage = ({ posts }) => {
    return (
        <Fragment>
            <Head>
                <title>Ghines Foundation | Every Action Counts</title>
                <meta name="description" content="Every Action, Big or Small, Counts." />
                
                {/* Open Graph / Facebook / WhatsApp */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://ghinesfoundation.org/" />
                <meta property="og:title" content="Ghines Foundation" />
                <meta property="og:description" content="Every Action, Big or Small, Counts." />
                <meta property="og:image" content="https://ghinesfoundation.org/og-image.jpg" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://ghinesfoundation.org/" />
                <meta name="twitter:title" content="Ghines Foundation" />
                <meta name="twitter:description" content="Every Action, Big or Small, Counts." />
                <meta name="twitter:image" content="https://ghinesfoundation.org/og-image.jpg" />
            </Head>

            <Hero />
            <EventSection />
            <BlogPreview posts={posts} /> 
            <Scrollbar />
        </Fragment>
    );
};

export async function getStaticProps() {
    try {
        const rawStories = await getAllNews();

        const mappedPosts = (rawStories || []).slice(0, 3).map((item) => {
            const dateObj = new Date(item.publishedDate);
            const day = dateObj.getDate().toString().padStart(2, '0');
            const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            
            return {
                id: item._id,
                Title: item.title,
                Slug: item.slug, 
                Author: item.author || 'The Ghines Foundation',
                PublishedDate: item.publishedDate,
                day,
                month: months[dateObj.getMonth()],
                Description: item.description,
                Image: { 
                    url: urlFor(item.image) 
                }
            };
        });

        return {
            props: { posts: mappedPosts },
            revalidate: 10,
        };
    } catch (error) {
        console.error('❌ Homepage data error:', error);
        return { props: { posts: [] } };
    }
}

export default HomePage;