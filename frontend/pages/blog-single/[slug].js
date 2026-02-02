// pages/blog-single/[slug].js
import React, { Fragment } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogSingle from '../../components/BlogDetails/BlogSingle';
import fetch from 'node-fetch';

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_MEDIA_URL = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || 'https://light-light-5ba7f2d7f7.media.strapiapp.com';

const BlogDetails = ({ post }) => {
  if (!post) {
    return (
      <Fragment>
        <PageTitle pageTitle="Post Not Found" pagesub="News & Stories" />
        <div style={{ textAlign: 'center', padding: '100px', minHeight: '400px' }}>
          <h2>Article not found</h2>
          <p>The article you're looking for doesn't exist or has been removed.</p>
        </div>
        <Scrollbar />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <PageTitle pageTitle={post.Title} pagesub="News & Stories" />
      <BlogSingle post={post} />
      <Scrollbar />
    </Fragment>
  );
};

export default BlogDetails;

export async function getStaticPaths() {
  if (!STRAPI_BASE_URL || !/^https?:\/\//.test(STRAPI_BASE_URL)) {
    console.error('[getStaticPaths] Invalid STRAPI_BASE_URL:', STRAPI_BASE_URL);
    return { paths: [], fallback: 'blocking' };
  }

  try {
    const cleanedBaseUrl = STRAPI_BASE_URL.replace(/\/$/, '');
    const fetchUrl = `${cleanedBaseUrl}/api/news-stories?fields[0]=Slug&fields[1]=publishedAt`;

    console.log('[getStaticPaths] Fetching from:', fetchUrl);
    const res = await fetch(fetchUrl);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[getStaticPaths] HTTP ${res.status}:`, errorText.substring(0, 200));
      return { paths: [], fallback: 'blocking' };
    }

    const data = await res.json();
    console.log('[getStaticPaths] Response:', JSON.stringify(data, null, 2));
    
    const posts = data.data || [];

    const paths = posts
      .filter(post => {
        const hasSlug = post && post.Slug;
        if (!hasSlug) console.warn('[getStaticPaths] Post missing Slug:', post);
        return hasSlug;
      })
      .map(post => ({
        params: { slug: post.Slug }
      }));

    console.log(`[getStaticPaths] Generated ${paths.length} paths:`, paths.map(p => p.params.slug));

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (err) {
    console.error('[getStaticPaths] Critical error:', err.message, err.stack);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  if (!STRAPI_BASE_URL || !/^https?:\/\//.test(STRAPI_BASE_URL)) {
    console.error('[getStaticProps] Invalid STRAPI_BASE_URL:', STRAPI_BASE_URL);
    return { notFound: true };
  }

  try {
    const cleanedBaseUrl = STRAPI_BASE_URL.replace(/\/$/, '');
    const fetchUrl = `${cleanedBaseUrl}/api/news-stories?filters[Slug][$eq]=${slug}&populate=*`;

    console.log(`[getStaticProps] Fetching slug "${slug}" from:`, fetchUrl);
    const res = await fetch(fetchUrl);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[getStaticProps] HTTP ${res.status}:`, errorText.substring(0, 200));
      return { notFound: true };
    }

    const data = await res.json();
    console.log('[getStaticProps] Response:', JSON.stringify(data, null, 2));

    const items = data.data || [];

    if (items.length === 0) {
      console.warn(`[getStaticProps] No post found for slug: ${slug}`);
      return { notFound: true };
    }

    const item = items[0];
    const imageUrl = extractImageUrl(item.Image);

    const post = {
      id: item.id,
      Title: item.Title ?? 'Untitled',
      Slug: item.Slug ?? slug,
      Author: item.Author ?? 'The Ghines Foundation',
      PublishedDate: item.PublishedDate ?? '',
      Content: item.Content ?? [],
      Description: item.Description ?? '',
      PhotoCredit: item.PhotoCredit ?? '',
      Image: { url: imageUrl },
    };

    console.log(`[getStaticProps] Successfully fetched: "${post.Title}"`);
    console.log(`[getStaticProps] Image URL: ${post.Image.url}`);

    return {
      props: { post },
      revalidate: 60,
    };
  } catch (err) {
    console.error(`[getStaticProps] Critical error for slug "${slug}":`, err.message, err.stack);
    return { notFound: true };
  }
}

function extractImageUrl(image) {
  if (!image) return null;

  if (image.url && image.url.startsWith('http')) return image.url;

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

  if (image.url) {
    return image.url.startsWith('/')
      ? `${STRAPI_MEDIA_URL}${image.url}`
      : `${STRAPI_MEDIA_URL}/${image.url}`;
  }

  return null;
}