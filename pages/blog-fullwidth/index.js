import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogList from '../../components/BlogList/BlogList';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export default function BlogPageFullwidth({ posts, pagination, fetchError }) {
  if (fetchError) {
    return (
      <Fragment>
        <PageTitle pageTitle={'News & Stories'} pagesub={'Home'} />
        <div style={{ textAlign: 'center', padding: '100px', minHeight: '400px' }}>
          <h2 className="text-2xl font-bold text-gray-700">Failed to load articles</h2>
          <p className="text-gray-500 mt-2">
            There was an error fetching posts. Check the server logs.
          </p>
          <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'left', margin: '20px auto', maxWidth: 800 }}>
            {fetchError}
          </pre>
        </div>
        <Scrollbar />
      </Fragment>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Fragment>
        <PageTitle pageTitle={'News & Stories'} pagesub={'Home'} />
        <div style={{ textAlign: 'center', padding: '100px', minHeight: '400px' }}>
          <h2 className="text-2xl font-bold text-gray-700">No articles found.</h2>
          <p className="text-gray-500 mt-2">
            Please check that your Strapi API URL is correct and your content is Published.
          </p>
        </div>
        <Scrollbar />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <PageTitle pageTitle={'News & Stories'} pagesub={'Home'} />
      <BlogList posts={posts} pagination={pagination} />
      <Scrollbar />
    </Fragment>
  );
}

export async function getStaticProps() {
  console.log('[blog-fullwidth] Starting getStaticProps');
  
  if (!STRAPI_API_URL || !/^https?:\/\//.test(STRAPI_API_URL)) {
    console.error('[blog-fullwidth] Invalid STRAPI_API_URL');
    return { 
      props: { 
        posts: [], 
        pagination: {}, 
        fetchError: 'Invalid STRAPI API URL configuration' 
      }, 
      revalidate: 60 
    };
  }

  try {
    const cleanedBase = STRAPI_API_URL.replace(/\/$/, '');
    const fetchUrl = `${cleanedBase}/api/news-stories?populate=*&sort[0]=PublishedDate:desc`;
    
    console.log('[blog-fullwidth] Fetching posts from:', fetchUrl);

    const res = await fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[blog-fullwidth] Fetch failed: ${res.status} ${res.statusText}`);
      console.error('[blog-fullwidth] Response body:', errorText.slice(0, 500));
      return { 
        props: { 
          posts: [], 
          pagination: {}, 
          fetchError: `Strapi API responded with ${res.status}: ${res.statusText}` 
        }, 
        revalidate: 60 
      };
    }

    const json = await res.json();
    const rawPosts = json.data || [];
    
    console.log('[blog-fullwidth] Successfully fetched', rawPosts.length, 'posts');

    // Map posts with safe null checking
    const posts = rawPosts.map(item => {
      const imageData = item?.Image;
      let imageUrl = '/images/blog/placeholder.jpg'; // Default fallback

      // Extract image URL safely
      if (imageData?.url) {
        imageUrl = imageData.url;
      } else if (imageData?.formats?.large?.url) {
        imageUrl = imageData.formats.large.url;
      } else if (imageData?.formats?.medium?.url) {
        imageUrl = imageData.formats.medium.url;
      } else if (imageData?.formats?.small?.url) {
        imageUrl = imageData.formats.small.url;
      }

      return {
        id: item.id || Math.random(),
        documentId: item.documentId || null,
        Title: item.Title || 'Untitled',
        Slug: item.Slug || `post-${item.id}`,
        Author: item.Author || 'The Ghines Foundation',
        PublishedDate: item.PublishedDate || item.publishedAt || new Date().toISOString(),
        Description: item.Description || '',
        Content: item.Content || [],
        PhotoCredit: item.PhotoCredit || '',
        Image: { 
          url: imageUrl 
        },
      };
    });

    const pagination = json.meta?.pagination || {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: posts.length
    };

    return { 
      props: { 
        posts, 
        pagination 
      }, 
      revalidate: 60 
    };

  } catch (error) {
    console.error('[blog-fullwidth] Critical error in getStaticProps:', error);
    return { 
      props: { 
        posts: [], 
        pagination: {}, 
        fetchError: error.message || 'Unknown error occurred' 
      }, 
      revalidate: 60 
    };
  }
}