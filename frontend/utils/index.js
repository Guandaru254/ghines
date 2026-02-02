// pages/blog/index.js
import React, { Fragment } from 'react';
import fetch from 'node-fetch';
import extractImageUrl from '../utils/extractImageUrl';
import BlogList from '../components/BlogList/BlogList';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_MEDIA_URL = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL;

export default function BlogPageFullwidth({ posts, pagination, fetchError }) {
  if (fetchError) {
    return (
      <Fragment>
        <PageTitle pageTitle={'News & Stories'} pagesub={'Home'} />
        <div style={{ textAlign: 'center', padding: '100px', minHeight: '400px' }}>
          <h2 className="text-2xl font-bold text-gray-700">Failed to load articles</h2>
          <p className="text-gray-500 mt-2">
            There was an error fetching posts. Check the server logs. (See `fetchError` prop)
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
            Please check that your Strapi API URL (NEXT_PUBLIC_STRAPI_API_URL) is correct and your content is Published.
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
  // Basic validation
  if (!STRAPI_API_URL || !/^https?:\/\//.test(STRAPI_API_URL)) {
    console.error('[CONFIG ERROR] NEXT_PUBLIC_STRAPI_API_URL is missing or invalid in .env.local');
    return { props: { posts: [], pagination: {}, fetchError: 'Invalid STRAPI API URL' }, revalidate: 60 };
  }

  try {
    const cleanedBase = STRAPI_API_URL.replace(/\/$/, '');
    const fetchUrl = `${cleanedBase}/api/news-stories?populate=*&sort[0]=PublishedDate:desc`;
    console.log('[STRAPI FETCH]', fetchUrl);

    const res = await fetch(fetchUrl, {
      // Optionally attach server-side token:
      // headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error(`[FETCH ERROR] status=${res.status} ${res.statusText} body:${txt.slice(0, 500)}`);
      return { props: { posts: [], pagination: {}, fetchError: `Strapi responded ${res.status}` }, revalidate: 60 };
    }

    const json = await res.json();
    const raw = json.data || [];
    console.log('[STRAPI] posts returned:', raw.length);

    // Debug: print the full first post (deep)
    if (raw.length > 0) {
      console.log('--- DEBUG rawPosts[0] ---');
      console.dir(raw[0], { depth: 6 });
      console.log('--- END DEBUG ---');
    }

    const posts = raw.map(item => {
      const attrs = item.attributes || {};
      const imageUrl = extractImageUrl(attrs); // whole attributes object passed in
      return {
        id: item.id,
        Title: attrs.Title ?? attrs.title ?? 'Untitled',
        Slug: attrs.Slug ?? attrs.slug ?? null,
        Author: (attrs.Author?.data?.attributes?.name) ?? attrs.Author ?? 'The Ghines Foundation',
        PublishedDate: attrs.PublishedDate ?? attrs.publishedAt ?? null,
        Description: attrs.Description ?? attrs.description ?? '',
        Content: attrs.Content ?? attrs.content ?? '',
        PhotoCredit: attrs.PhotoCredit ?? attrs.photoCredit ?? '',
        Image: { url: imageUrl }, // may be null
        raw: item,
      };
    });

    // Server-side accessibility check (optional): try HEAD on first image to detect AccessDenied
    if (posts.length > 0 && posts[0].Image?.url) {
      try {
        const head = await fetch(posts[0].Image.url, { method: 'HEAD' });
        if (!head.ok) {
          console.warn('[MEDIA] HEAD check failed for first image:', head.status, head.statusText);
          // Do not throw; we will still return posts and client will fallback.
        } else {
          console.log('[MEDIA] First image accessible (HEAD ok).');
        }
      } catch (err) {
        console.warn('[MEDIA] HEAD request failed for first image:', err.message);
      }
    } else {
      console.log('[MEDIA] No image URL found for first post; falling back.');
    }

    const pagination = json.meta?.pagination ?? {};

    return { props: { posts, pagination }, revalidate: 60 };
  } catch (err) {
    console.error('[CRITICAL ERROR in getStaticProps]', err);
    return { props: { posts: [], pagination: {}, fetchError: String(err) }, revalidate: 60 };
  }
}
