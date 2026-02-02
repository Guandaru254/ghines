import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogList from '../../components/BlogList/BlogList';
import { getAllNews, urlFor } from '../../lib/sanity';

const BlogPage = ({ posts }) => {
    return (
        <Fragment>
            <PageTitle pageTitle="Latest News" pagesub="Blog" />
            <BlogList posts={posts} />
            <Scrollbar />
        </Fragment>
    );
};

export async function getStaticProps() {
    try {
        const rawStories = await getAllNews();

        if (!rawStories || !Array.isArray(rawStories)) {
            console.warn('⚠️ getAllNews returned invalid data');
            return { 
                props: { posts: [] }, 
                revalidate: 10 
            };
        }

        // CRITICAL FIX: Sort by date (newest first)
        const sortedStories = [...rawStories].sort((a, b) => {
            const dateA = new Date(a.publishedDate || a._createdAt).getTime();
            const dateB = new Date(b.publishedDate || b._createdAt).getTime();
            return dateB - dateA; // Descending order (newest first)
        });

        const mappedPosts = sortedStories.map((item) => {
            const dateString = item.publishedDate || item._createdAt || new Date().toISOString();
            const dateObj = new Date(dateString);
            const isValid = !isNaN(dateObj.getTime());
            const finalDate = isValid ? dateObj : new Date();

            const day = finalDate.getDate().toString().padStart(2, '0');
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            const month = monthNames[finalDate.getMonth()];
            
            const imageUrl = item.image?.asset 
                ? urlFor(item.image).url() 
                : '/images/blog/placeholder.jpg';

            const slugValue = item.slug || '';

            return {
                id: item._id,
                Title: item.title || 'Untitled',
                Slug: slugValue,
                Author: item.author || 'The Ghines Foundation',
                PublishedDate: dateString,
                day: day,
                month: month,
                Description: item.description || '',
                Image: { url: imageUrl }
            };
        });

        console.log(`✅ Blog page: Loaded ${mappedPosts.length} posts, sorted by date (newest first)`);

        return {
            props: {
                posts: JSON.parse(JSON.stringify(mappedPosts)),
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error('❌ CRITICAL: Blog page getStaticProps failed:', error);
        return { 
            props: { posts: [] }, 
            revalidate: 1 
        };
    }
}

export default BlogPage;