import React, { Fragment } from 'react';
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

  return (
    <Fragment>
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