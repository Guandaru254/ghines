import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogList from '../../components/BlogList/BlogList';
import { getAllNews, urlFor } from '../../lib/sanity';

/**
 * Production News Page (Full Width) - Sanity Powered
 * Senior Developer Note: This implementation enforces a strict data contract
 * between Sanity's flexible schema and the legacy frontend's rigid expectations.
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

    if (!rawStories || !Array.isArray(rawStories)) {
      throw new Error("Invalid data format received from Sanity");
    }

    /**
     * STRICTURED SORTING: Latest to Earliest
     * We prioritize manually set publishedDate, then fallback to system _createdAt.
     */
    const sortedStories = [...rawStories].sort((a, b) => {
      const dateA = new Date(a.publishedDate || a._createdAt || 0).getTime();
      const dateB = new Date(b.publishedDate || b._createdAt || 0).getTime();
      return dateB - dateA;
    });

    const mappedPosts = sortedStories.map((item) => {
      // Robust Date Handling
      const rawDate = item.publishedDate || item._createdAt || new Date().toISOString();
      const dateObj = new Date(rawDate);
      const isValidDate = !isNaN(dateObj.getTime());
      
      const day = isValidDate ? dateObj.getDate().toString().padStart(2, '0') : '--';
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
      const month = isValidDate ? monthNames[dateObj.getMonth()] : 'ERR';
      
      // Image Asset Resolution
      const imageUrl = item.image?.asset 
        ? urlFor(item.image).url() 
        : '/images/blog/placeholder.jpg';

      // Enforcing the UI Component Data Contract
      return {
        id: item._id,
        _id: item._id,
        Title: item.title || 'Untitled Story',
        title: item.title || 'Untitled Story',
        // Sanity slugs are objects { current: "string" }
        Slug: item.slug?.current || item.slug || '',
        slug: item.slug?.current || item.slug || '',
        Author: item.author || 'The Ghines Foundation',
        PublishedDate: rawDate,
        publishedDate: rawDate,
        Description: item.description || '',
        excerpt: item.description || '',
        Content: item.content || [],
        
        // Legacy Property Mapping (Redundancy for broad component support)
        screens: imageUrl,
        blogSingleImg: imageUrl,
        recent: imageUrl,
        image: imageUrl,
        Image: { url: imageUrl },
        
        // UI Display Primitives
        day,
        month,
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
      // Revalidate every 10 seconds (ISR) for high-availability updates
      revalidate: 10 
    };
  } catch (error) {
    // Senior approach: fail gracefully but log the stack trace for monitoring
    console.error("[BlogPageFullwidth] Critical Error:", error.message);
    return {
      props: { 
        posts: [], 
        pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } 
      },
      revalidate: 1 
    };
  }
}