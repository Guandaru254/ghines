import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogList from '../../components/BlogList/BlogList';
import { getAllNews, urlFor } from '../../lib/sanity';

/**
 * Production News Page (Full Width) - Sanity Powered
 * Senior Developer Note: This file serves as the primary controller for News data.
 * The transformSanityData function is exported to ensure consistency across the site.
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

/**
 * REUSABLE DATA TRANSFORMER
 * Enforces a strict schema contract. If the CMS structure changes, 
 * updating this function fixes the entire site.
 */
export const transformSanityData = (rawStories) => {
  return (rawStories || []).map((item) => {
    // Robust Date handling with multiple fallbacks
    const rawDate = item.publishedDate || item._createdAt || new Date().toISOString();
    const dateObj = new Date(rawDate);
    const isValidDate = !isNaN(dateObj.getTime());
    
    const day = isValidDate ? dateObj.getDate().toString().padStart(2, '0') : '--';
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
    const month = isValidDate ? monthNames[dateObj.getMonth()] : 'ERR';
    
    // Asset resolution with placeholder fallback
    const imageUrl = item.image?.asset 
      ? urlFor(item.image).url() 
      : '/images/blog/placeholder.jpg';

    return {
      id: item._id,
      _id: item._id,
      Title: item.title || 'Untitled Story',
      title: item.title || 'Untitled Story',
      Slug: item.slug?.current || item.slug || '',
      slug: item.slug?.current || item.slug || '',
      Author: item.author || 'The Ghines Foundation',
      PublishedDate: rawDate,
      publishedDate: rawDate,
      Description: item.description || '',
      excerpt: item.description || '',
      Content: item.content || [],
      
      // Legacy UI Support
      screens: imageUrl,
      blogSingleImg: imageUrl,
      recent: imageUrl,
      image: imageUrl,
      Image: { url: imageUrl },
      
      // UI Primitives
      day,
      month,
      category: 'News',
      link: 'READ MORE',
      blClass: 'format-standard-image',
      animation: '1200'
    };
  });
};

export async function getStaticProps() {
  try {
    const rawStories = await getAllNews();

    if (!rawStories || !Array.isArray(rawStories)) {
      throw new Error("Invalid data format received from Sanity");
    }

    // Sort: Latest to Earliest using Numeric Timestamps
    const sortedStories = [...rawStories].sort((a, b) => {
      const dateA = new Date(a.publishedDate || a._createdAt || 0).getTime();
      const dateB = new Date(b.publishedDate || b._createdAt || 0).getTime();
      return dateB - dateA;
    });

    const mappedPosts = transformSanityData(sortedStories);

    return {
      props: {
        posts: JSON.parse(JSON.stringify(mappedPosts)),
        pagination: { 
          page: 1, 
          pageSize: mappedPosts.length, 
          pageCount: 1, 
          total: mappedPosts.length 
        }
      },
      revalidate: 10 
    };
  } catch (error) {
    console.error("[BlogPageFullwidth] Critical SSR Error:", error.message);
    return {
      props: { posts: [], pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
      revalidate: 1 
    };
  }
}