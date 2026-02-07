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

        const sortedStories = [...(rawStories || [])].sort((a, b) => 
            new Date(b.publishedDate) - new Date(a.publishedDate)
        );

        const mappedPosts = sortedStories.map((item) => {
            const dateObj = new Date(item.publishedDate);
            const day = dateObj.getDate().toString().padStart(2, '0');
            const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            const month = months[dateObj.getMonth()];
            
            return {
                id: item._id,
                Title: item.title,
                Slug: item.slug,
                Author: item.author || 'The Ghines Foundation',
                PublishedDate: item.publishedDate,
                day,
                month,
                Description: item.description,
                Image: { url: urlFor(item.image) }
            };
        });

        console.log(`✅ Blog page loaded ${mappedPosts.length} posts`);

        return {
            props: { posts: mappedPosts },
            revalidate: 10,
        };
    } catch (error) {
        console.error('❌ Blog page error:', error);
        return { props: { posts: [] } };
    }
}

export default BlogPage;