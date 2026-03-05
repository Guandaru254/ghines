import React, { Fragment } from 'react';
import Head from 'next/head'; 
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogSingle from '../../components/BlogDetails/BlogSingle';
import { client, urlFor } from '../../lib/sanity';

const BlogDetails = ({ post, seoImage }) => {
  if (!post) return null;

  // Use the pre-built string for SEO, but the post.image object for the UI
  const ogImageUrl = seoImage || "https://ghinesfoundation.org/og-image.jpg";

  return (
    <Fragment>
      <Head>
        <title>{post.title} | Ghines Foundation</title>
        <meta name="description" content={post.description || "Every Action, Big or Small, Counts."} />

        {/* Essential OG Tags for WhatsApp/LinkedIn */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://ghinesfoundation.org/blog-single/${post.slug}`} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>

      <PageTitle pageTitle={post.title} pagesub="News & Stories" />
      
      {/* CRITICAL: Passing 'post' exactly as it comes from Sanity 
          so BlogSingle can render the image correctly.
      */}
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

  // Generate a separate string for the SEO tags to avoid build crashes
  let seoImage = "https://ghinesfoundation.org/og-image.jpg";
  
  if (post.image && post.image.asset) {
    try {
      // Use .url() only. If this crashes, the catch block saves the build.
      seoImage = urlFor(post.image).url();
    } catch (error) {
      console.error("SEO Image generation failed:", error);
    }
  }

  return {
    props: {
      post, // Sent as a full object for the UI
      seoImage // Sent as a string for the <Head>
    },
    revalidate: 10,
  };
}