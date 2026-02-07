import React, { Fragment } from 'react';
import Hero from '../components/Hero/Hero';
import EventSection from '../components/EventSection/EventSection';
import BlogPreview from '../components/BlogPreview/BlogPreview';
// Updated to match the casing suggested by your console error
import Footer from '../components/footer/Footer'; 
import Scrollbar from '../components/scrollbar/scrollbar';
import { getAllNews, urlFor } from '../lib/sanity';

const HomePage = ({ posts }) => {
    return (
        <Fragment>
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
                Slug: item.slug, // Your lib/sanity query already returns slug.current as "slug"
                Author: item.author || 'The Ghines Foundation',
                PublishedDate: item.publishedDate,
                day,
                month: months[dateObj.getMonth()],
                Description: item.description,
                // FIX: Removed .url() here because urlFor() now returns a string directly
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