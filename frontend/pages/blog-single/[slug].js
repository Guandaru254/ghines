import React, { Fragment } from 'react';
import Head from 'next/head'; 
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogSingle from '../../components/BlogDetails/BlogSingle';
import { client, urlFor } from '../../lib/sanity';

const BlogDetails = ({ post }) => {
  if (!post) return null;

  return (
    <Fragment>
      <Head>
        <title>{post.title} | Ghines Foundation</title>
        <meta name="description" content={post.description} />

        {/* Open Graph / WhatsApp */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://ghinesfoundation.org/blog-single/${post.slug}`} />
        <meta property="og:image" content={post.ogImageUrl} />
        <meta property="og:image:secure_url" content={post.ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.ogImageUrl} />
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
  const paths = posts.map(p => ({ params: { slug: p.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const query = `*[_type == "newsStory" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "publishedDate": coalesce(publishedDate, _createdAt),
    description,
    author,
    image,
    content
  }`;

  const post = await client.fetch(query, { slug: params.slug });

  if (!post) return { notFound: true };

  // Bulletrpoof URL generation
  let finalImageUrl = "https://ghinesfoundation.org/og-image.jpg";
  
  if (post.image && post.image.asset) {
    try {
      // Simplest form to avoid the ".width is not a function" error
      finalImageUrl = urlFor(post.image).url();
    } catch (e) {
      console.error("Sanity Image Error:", e);
    }
  }

  return {
    props: {
      post: {
        id: post._id,
        title: post.title,
        slug: post.slug,
        author: post.author || 'The Ghines Foundation',
        publishedDate: post.publishedDate,
        description: post.description || "Every Action, Big or Small, Counts.",
        ogImageUrl: finalImageUrl,
        // Passing string directly to avoid component-side builder errors
        image: post.image ? urlFor(post.image).url() : null, 
        content: post.content || [],
      }
    },
    revalidate: 10,
  };
}