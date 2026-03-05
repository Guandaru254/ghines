import React, { Fragment } from 'react';
import Head from 'next/head'; // Added for dynamic metadata
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogSingle from '../../components/BlogDetails/BlogSingle';
import { client, urlFor } from '../../lib/sanity';

const BlogDetails = ({ post }) => {
  if (!post) {
    return (
      <Fragment>
        <PageTitle pageTitle="Post Not Found" pagesub="News & Stories" />
        <Scrollbar />
      </Fragment>
    );
  }

  // Construct the image URL safely
  const ogImage = post.image ? post.image.url() : "https://ghinesfoundation.org/og-image.jpg";

  return (
    <Fragment>
      <Head>
        {/* Dynamic Title and Description */}
        <title>{post.title} | Ghines Foundation</title>
        <meta name="description" content={post.description || "Every Action, Big or Small, Counts."} />

        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || "Every Action, Big or Small, Counts."} />
        <meta property="og:url" content={`https://ghinesfoundation.org/blog-single/${post.slug}`} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description || "Every Action, Big or Small, Counts."} />
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

  return {
    props: {
      post: {
        id: post._id,
        title: post.title,
        slug: post.slug,
        author: post.author || 'The Ghines Foundation',
        publishedDate: post.publishedDate,
        description: post.description,
        image: urlFor(post.image),
        content: post.content || [],
      }
    },
    revalidate: 60,
  };
}