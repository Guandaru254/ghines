import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogList from '../../components/BlogList/BlogList';
import { getAllNews, urlFor } from '../../lib/sanity';

/**
 * Production News Page (Full Width) - Sanity Powered
 * Path: /blog-fullwidth
 * This version replaces the legacy Strapi implementation.
 */
export default function BlogPageFullwidth({ posts, pagination }) {
  const hasPosts = posts && posts.length > 0;

  return (
    <Fragment>
      <PageTitle pageTitle={'News & Stories'} pagesub={'Home'} />
      {hasPosts ? (
        <BlogList posts={posts} pagination={pagination} />
      ) : (
        <div className="py-20 text-center">
          <div className="container">
            <h2 className="text-2xl font-semibold text-gray-800">No stories published yet.</h2>
            <p className="text-gray-500 mt-2">Check back later for updates from the foundation.</p>
          </div>
        </div>
      )}
      <Scrollbar />
    </Fragment>
  );
}

export async function getStaticProps() {
  try {
    const rawStories = await getAllNews();

    /**
     * STRENGTHENED SORTING LOGIC: Latest to Earliest
     * We use getTime() to ensure we are comparing numeric timestamps.
     */
    const sortedStories = [...(rawStories || [])].sort((a, b) => {
      const timeA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
      const timeB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
      return timeB - timeA; 
    });

    // Mapping and sanitizing data for the legacy UI components
    const mappedPosts = sortedStories.map((item) => {
      const dateObj = item.publishedDate ? new Date(item.publishedDate) : new Date();
      const day = dateObj.getDate().toString().padStart(2, '0');
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
      const month = monthNames[dateObj.getMonth()];
      
      const imageUrl = item.image && item.image.asset 
        ? urlFor(item.image).url() 
        : '/images/blog/placeholder.jpg';

      return {
        id: item._id || '',
        Title: item.title || 'Untitled',
        Slug: item.slug || '',
        Author: item.author || 'The Ghines Foundation',
        PublishedDate: item.publishedDate || '',
        Description: item.description || '',
        Content: item.content || [],
        
        // Image mapping for UI components
        screens: imageUrl,
        blogSingleImg: imageUrl,
        recent: imageUrl,
        image: imageUrl,
        Image: {
          url: imageUrl
        },
        
        day: day,
        month: month,
        category: 'News',
        link: 'READ MORE',
        blClass: 'format-standard-image',
        animation: '1200'
      };
    });

    // Final safety scrub for Next.js serialization
    const posts = JSON.parse(JSON.stringify(mappedPosts));

    return {
      props: {
        posts,
        pagination: { 
          page: 1, 
          pageSize: posts.length, 
          pageCount: 1, 
          total: posts.length 
        }
      },
      // ISR: Re-generate the page every 10 seconds to keep content fresh
      revalidate: 10 
    };
  } catch (error) {
    console.error("Critical Fetch/Serialization Error:", error);
    return {
      props: { posts: [], pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } },
      revalidate: 10
    };
  }
}