import React, { Fragment } from 'react';
import Head from 'next/head'; 
import PageTitle from '../../components/PageTitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import BlogSingle from '../../components/BlogDetails/BlogSingle';
import { client, urlFor } from '../../lib/sanity';

const BlogDetails = ({ post }) => {
  if (!post) return null;

  // This URL is generated on the server and passed as a clean string
  const ogImageUrl = post.imageUrl || "https://ghinesfoundation.org/og-image.jpg";

  return (
    <Fragment>
      <Head>
        <title>{post.title} | Ghines Foundation</title>
        <meta name="description" content={post.description} />

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

  // Generate the image URL strictly on the server side
  let imageUrl = "https://ghinesfoundation.org/og-image.jpg";
  if (post.image && post.image.asset) {
    imageUrl = urlFor(post.image).width(1200).height(630).fit('crop').url();
  }

  return {
    props: {
      post: {
        ...post,
        imageUrl: imageUrl, // Pass as a simple string
        description: post.description || "Every Action, Big or Small, Counts.",
      }
    },
    revalidate: 10,
  };
}