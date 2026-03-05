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
                {/* Since _app.js now handles the OG tags, we only keep the 
                  unique page title here to ensure it's specific to the home route.
                */}
                <title>Ghines Foundation | Every Action Counts</title>
            </Head>

            <Hero />
            <EventSection />
            <BlogPreview posts={posts} /> 
            <Scrollbar />
            <Footer />
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