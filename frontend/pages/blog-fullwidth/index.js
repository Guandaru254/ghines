import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogList from '../../components/BlogList/BlogList';
import { getAllNews, urlFor } from '../../lib/sanity';

/**
 * Production News Page (Full Width) - Sanity Powered
 * Updated with robust Date parsing and sorting.
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
     * DATE FIX: Consistent Sorting
     * Uses publishedDate, falls back to Sanity's internal _createdAt.
     */
    const sortedStories = [...(rawStories || [])].sort((a, b) => {
      const dateA = new Date(a.publishedDate || a._createdAt || 0);
      const dateB = new Date(b.publishedDate || b._createdAt || 0);
      return dateB.getTime() - dateA.getTime();
    });

    const mappedPosts = sortedStories.map((item) => {
      // DATE FIX: Create a safe date object
      const rawDate = item.publishedDate || item._createdAt || new Date().toISOString();
      const dateObj = new Date(rawDate);
      
      // Validation check for "Invalid Date"
      const isValid = !isNaN(dateObj.getTime());
      
      const day = isValid ? dateObj.getDate().toString().padStart(2, '0') : '--';
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
      const month = isValid ? monthNames[dateObj.getMonth()] : 'ERR';
      
      const imageUrl = item.image && item.image.asset 
        ? urlFor(item.image).url() 
        : '/images/blog/placeholder.jpg';

      return {
        id: item._id || '',
        Title: item.title || 'Untitled',
        Slug: item.slug?.current || item.slug || '',
        Author: item.author || 'The Ghines Foundation',
        PublishedDate: rawDate,
        Description: item.description || '',
        Content: item.content || [],
        
        // Image mapping for legacy components
        screens: imageUrl,
        blogSingleImg: imageUrl,
        recent: imageUrl,
        image: imageUrl,
        Image: { url: imageUrl },
        
        // UI Specific Display Fields
        day: day,
        month: month,
        category: 'News',
        link: 'READ MORE',
        blClass: 'format-standard-image',
        animation: '1200'
      };
    });

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
    console.error("Critical Fetch/Serialization Error:", error);
    return {
      props: { posts: [], pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } },
      revalidate: 10
    };
  }
}