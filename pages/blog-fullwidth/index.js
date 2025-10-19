// pages/news/index.js
import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/Scrollbar';
import BlogList from '../../components/BlogList/BlogList';
import fetch from 'node-fetch';

// ✅ STRAPI CONFIG (env + media domain)
const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_MEDIA_URL =
  process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL ||
  'https://light-light-5ba7f2d7f7.media.strapiapp.com';

// =====================================================
//  MAIN COMPONENT
// =====================================================
const BlogPageFullwidth = ({ posts, pagination }) => {
  if (!posts || posts.length === 0) {
    return (
      <Fragment>
        <PageTitle pageTitle={'News & Stories'} pagesub={'Home'} />
        <div style={{ textAlign: 'center', padding: '100px', minHeight: '400px' }}>
          <h2 className="text-2xl font-bold text-gray-700">No articles found.</h2>
          <p className="text-gray-500 mt-2">
            Please check your console for fetch errors, verify the Strapi API URL,
            and ensure content is <strong>Published</strong> in Strapi.
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
};

export default BlogPageFullwidth;

// =====================================================
//  STATIC PROPS BUILDER
// =====================================================
export async function getStaticProps() {
  if (!STRAPI_BASE_URL || !/^https?:\/\//.test(STRAPI_BASE_URL)) {
    console.error('[CONFIG ERROR] Invalid NEXT_PUBLIC_STRAPI_API_URL.');
    return { props: { posts: [], pagination: {} }, revalidate: 60 };
  }

  try {
    const cleanedBaseUrl = STRAPI_BASE_URL.replace(/\/$/, '');
    const fetchUrl = `${cleanedBaseUrl}/api/news-stories?populate=*&sort[0]=PublishedDate:desc`;

    console.log(`[STRAPI FETCH] ${fetchUrl}`);
    const res = await fetch(fetchUrl);
    if (!res.ok) {
      const errBody = await res.text();
      console.error(`[FETCH ERROR] ${res.status} ${res.statusText}: ${errBody.slice(0, 200)}...`);
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    const rawPosts = data.data || [];

    if (rawPosts.length > 0) {
      console.log('-----------------------------------------');
      console.log('[DEBUG] Raw Image data structure for first post:');
      console.log(JSON.stringify(rawPosts[0].Image, null, 2));
      console.log('-----------------------------------------');
    }

    // ✅ FIX: Handle flat Strapi v5 schema (no attributes nesting)
    const formattedPosts = rawPosts.map((item) => {
      const imageUrl = extractImageUrl(item.Image);

      return {
        id: item.id,
        Title: item.Title ?? '',
        Slug: item.Slug ?? '',
        Author: item.Author ?? 'The Ghines Foundation',
        PublishedDate: item.PublishedDate ?? '',
        Content: item.Content ?? [],
        PhotoCredit: item.PhotoCredit ?? '',
        Image: { url: imageUrl },
      };
    });

    const pagination = data.meta?.pagination || {};
    console.log(`[SUCCESS] Processed ${formattedPosts.length} posts.`);
    if (formattedPosts.length > 0) {
      console.log(`[SUCCESS] First post Image URL: ${formattedPosts[0].Image.url}`);
    }

    return {
      props: { posts: formattedPosts, pagination },
      revalidate: 60,
    };
  } catch (err) {
    console.error('[CRITICAL ERROR]', err);
    return { props: { posts: [], pagination: {} }, revalidate: 60 };
  }
}

// =====================================================
//  IMAGE URL EXTRACTOR (handles Strapi Cloud correctly)
// =====================================================
function extractImageUrl(image) {
  if (!image) return null;

  // If Strapi already gives a valid URL
  if (image.url && image.url.startsWith('http')) return image.url;

  // Check for optimized formats (large, medium, etc.)
  const formats = image.formats;
  if (formats) {
    for (const size of ['large', 'medium', 'small', 'thumbnail']) {
      const url = formats[size]?.url;
      if (url) {
        return url.startsWith('http')
          ? url
          : `${STRAPI_MEDIA_URL}${url.startsWith('/') ? '' : '/'}${url}`;
      }
    }
  }

  // If the main URL exists but is relative
  if (image.url) {
    return image.url.startsWith('/')
      ? `${STRAPI_MEDIA_URL}${image.url}`
      : `${STRAPI_MEDIA_URL}/${image.url}`;
  }

  return null;
}
