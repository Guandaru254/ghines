import React, { Fragment } from 'react';
import Head from 'next/head';
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogSingle from '../../components/BlogDetails/BlogSingle';
import { client } from '../../lib/sanity'; // ← NO urlFor import here
import imageUrlBuilder from '@sanity/image-url'; // ← Raw builder, bypasses your wrapper

// Build a FRESH builder instance just for SEO — no wrapper, no .url() confusion
const builder = imageUrlBuilder(client);

const BlogDetails = ({ post, seoImageUrl }) => {
  if (!post) return null;

  const fallback = 'https://ghinesfoundation.org/og-image.jpg';
  const ogImage = seoImageUrl || fallback;
  const pageUrl = `https://ghinesfoundation.org/blog-single/${post.slug}`;

  return (
    <Fragment>
      <Head>
        <title>{post.title} | Ghines Foundation</title>
        <meta name="description" content={post.description || 'Every Action, Big or Small, Counts.'} />

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Ghines Foundation" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || 'Every Action, Big or Small, Counts.'} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={post.title} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description || 'Every Action, Big or Small, Counts.'} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <PageTitle pageTitle={post.title} pagesub="News & Stories" />
      <BlogSingle post={post} />
      <Scrollbar />
    </Fragment>
  );
};

export default BlogDetails;

export async function getStaticPaths() {
  const query = `*[_type == "newsStory" && defined(slug.current)] { "slug": slug.current }`;
  const posts = await client.fetch(query);
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const query = `*[_type == "newsStory" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    content,
    author
  }`;

  const post = await client.fetch(query, { slug: params.slug });
  if (!post) return { notFound: true };

  // ── SEO Image: built raw, never touches your urlFor wrapper ──
  let seoImageUrl = 'https://ghinesfoundation.org/og-image.jpg';

  if (post?.image?.asset?._ref) {
    try {
      // builder.image() returns a builder object — .url() is called HERE, once
      const url = builder.image(post.image).width(1200).height(630).fit('crop').url();
      console.log('[SEO] Image URL:', url);
      if (url) seoImageUrl = url;
    } catch (e) {
      console.error('[SEO] Builder failed:', e.message);
    }
  } else {
    console.warn('[SEO] No image asset ref for slug:', params.slug);
  }

  return {
    props: { post, seoImageUrl },
    revalidate: 10,
  };
}