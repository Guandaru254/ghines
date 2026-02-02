import React, { Fragment } from 'react';
import Hero from '../components/hero/hero';
import EventSection from '../components/EventSection/EventSection';
import BlogPreview from '../components/BlogPreview/BlogPreview';
import Scrollbar from '../components/scrollbar/scrollbar';
import { getAllNews, urlFor } from '../lib/sanity';

const HomePage = ({ posts = [] }) => {
    return (
        <Fragment>
            <Hero />
            <EventSection />
            {/* Pass posts as props - BlogPreview will consume them */}
            <BlogPreview posts={posts} />
            <Scrollbar />
        </Fragment>
    );
};

export async function getStaticProps() {
    try {
        const rawStories = await getAllNews();

        if (!rawStories || !Array.isArray(rawStories)) {
            console.warn("⚠️ getAllNews returned invalid data");
            return { props: { posts: [] }, revalidate: 10 };
        }

        // Sort and slice top 3 for homepage preview
        const sortedStories = [...rawStories]
            .sort((a, b) => {
                const dateA = new Date(a.publishedDate || a._createdAt).getTime();
                const dateB = new Date(b.publishedDate || b._createdAt).getTime();
                return dateB - dateA;
            })
            .slice(0, 3);

        const mappedPosts = sortedStories.map((item) => {
            const dateString = item.publishedDate || item._createdAt || new Date().toISOString();
            const dateObj = new Date(dateString);
            const isValid = !isNaN(dateObj.getTime());
            const finalDate = isValid ? dateObj : new Date();

            const day = finalDate.getDate().toString().padStart(2, '0');
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
            const month = monthNames[finalDate.getMonth()];
            
            // CRITICAL FIX: Use 'image' not 'mainImage' 
            // Sanity returns 'image' based on your getAllNews() query
            const imageUrl = item.image?.asset 
                ? urlFor(item.image).url() 
                : '/images/blog/placeholder.jpg';

            const slugValue = item.slug || '';

            return {
                id: item._id,
                title: item.title || 'Untitled',
                slug: slugValue,
                author: item.author || 'The Ghines Foundation',
                day: day,
                month: month,
                image: imageUrl,
                description: item.description || '',
            };
        });

        return {
            props: {
                posts: JSON.parse(JSON.stringify(mappedPosts)),
            },
            revalidate: 10, // Revalidate every 10 seconds
        };
    } catch (error) {
        console.error("❌ CRITICAL: Homepage getStaticProps failed:", error);
        return { 
            props: { posts: [] }, 
            revalidate: 1 
        };
    }
}

export default HomePage;