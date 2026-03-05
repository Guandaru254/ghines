import React, { Fragment } from 'react';
import Head from 'next/head'; 
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogSingle from '../../components/BlogDetails/BlogSingle';
import { client, urlFor } from '../../lib/sanity';

const BlogDetails = ({ post, seoImageUrl }) => {
  if (!post) return null;

  const fallback = "https://ghinesfoundation.org/og-image.jpg";
  const ogImage = seoImageUrl || fallback;
  const pageUrl = `https://ghinesfoundation.org/blog-single/${post.slug}`;

  return (
    <Fragment>
      <Head>
        <title>{post.title} | Ghines Foundation</title>
        <meta name="description" content={post.description || "Every Action, Big or Small, Counts."} />

        {/* OpenGraph - LinkedIn, WhatsApp, Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Ghines Foundation" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || "Every Action, Big or Small, Counts."} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={post.title} />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description || "Every Action, Big or Small, Counts."} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={post.title} />
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

  // --- SEO Image: built as a plain string, isolated from the UI post object ---
  let seoImageUrl = "https://ghinesfoundation.org/og-image.jpg";

  if (post?.image?.asset?._ref) {
    try {
      // Step 1: Try the safest possible call — no .width(), no .height()
      const rawUrl = urlFor(post.image).url();

      // Step 2: Log it so you can verify it's the right image, not the logo
      console.log(`[SEO] Resolved image for "${params.slug}":`, rawUrl);

      if (rawUrl) {
        // Step 3: Append Sanity's image transform params directly in the URL
        // This avoids .width() method crashes entirely
        seoImageUrl = `${rawUrl}?w=1200&h=630&fit=crop&auto=format`;
      }
    } catch (error) {
      console.error(`[SEO] urlFor failed for slug "${params.slug}":`, error.message);
      // Falls back to the site logo — build will NOT crash
    }
  } else {
    // This log tells you if the post simply has no image in Sanity
    console.warn(`[SEO] No image asset found for slug: "${params.slug}"`);
  }

  return {
    props: {
      post,        // Full object → BlogSingle renders correctly
      seoImageUrl, // Plain string → <Head> og:image tags only
    },
    revalidate: 10,
  };
}