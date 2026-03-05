import React, { Fragment } from 'react';
import Head from 'next/head'; 
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogSingle from '../../components/BlogDetails/BlogSingle';
import { client, urlFor } from '../../lib/sanity';

const BlogDetails = ({ post }) => {
  if (!post) return null;

  const ogImageUrl = post.imageUrl || "https://ghinesfoundation.org/og-image.jpg";

  return (
    <Fragment>
      <Head>
        <title>{post.title} | Ghines Foundation</title>
        <meta name="description" content={post.description} />

        {/* Essential OG Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://ghinesfoundation.org/blog-single/${post.slug}`} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        
        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:image" content={ogImageUrl} />
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
    content
  }`;

  const post = await client.fetch(query, { slug: params.slug });

  if (!post) return { notFound: true };

  // Simplified Image Handling to prevent build crashes
  let imageUrl = "https://ghinesfoundation.org/og-image.jpg";
  
  if (post.image && post.image.asset) {
    try {
      // Just get the base URL without extra transformations
      imageUrl = urlFor(post.image).url();
    } catch (error) {
      console.error("Image generation failed:", error);
    }
  }

  return {
    props: {
      post: {
        ...post,
        imageUrl: imageUrl, 
        description: post.description || "Every Action, Big or Small, Counts.",
      }
    },
    revalidate: 10,
  };
}