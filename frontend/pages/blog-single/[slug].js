// pages/blog-single/[slug].js
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

/**
 * Generate static paths for all blog posts from Sanity
 */
export async function getStaticPaths() {
  try {
    const query = `*[_type == "newsStory" && defined(slug.current)] {
      "slug": slug.current
    }`;
    
    const posts = await client.fetch(query);
    
    const paths = posts
      .filter(post => post.slug)
      .map(post => ({
        params: { slug: post.slug }
      }));

    console.log(`✅ Generated ${paths.length} static paths for blog posts`);

    return {
      paths,
      fallback: 'blocking', // Generate missing pages on-demand
    };
  } catch (error) {
    console.error('❌ Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

/**
 * Fetch individual blog post data from Sanity
 */
export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    const query = `*[_type == "newsStory" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      "publishedDate": coalesce(publishedDate, _createdAt),
      description,
      author,
      image,
      content
    }`;

    const post = await client.fetch(query, { slug });

    if (!post) {
      console.warn(`⚠️ No post found for slug: ${slug}`);
      return { notFound: true };
    }

    // Format the post data to match BlogSingle component expectations
    const dateString = post.publishedDate || post._createdAt || new Date().toISOString();
    const dateObj = new Date(dateString);
    const isValid = !isNaN(dateObj.getTime());
    const finalDate = isValid ? dateObj : new Date();

    const day = finalDate.getDate().toString().padStart(2, '0');
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
    const month = monthNames[finalDate.getMonth()];
    const year = finalDate.getFullYear();

    const imageUrl = post.image?.asset 
      ? urlFor(post.image).url() 
      : '/images/blog/placeholder.jpg';

    const formattedPost = {
      id: post._id,
      Title: post.title || 'Untitled',
      Slug: post.slug || slug,
      Author: post.author || 'The Ghines Foundation',
      PublishedDate: `${year}-${String(finalDate.getMonth() + 1).padStart(2, '0')}-${day}`,
      day: day,
      month: month,
      year: year,
      Content: post.content || [],
      Description: post.description || '',
      Image: { url: imageUrl },
    };

    console.log(`✅ Successfully fetched post: "${formattedPost.Title}"`);

    return {
      props: { post: formattedPost },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error(`❌ Error fetching post with slug "${slug}":`, error);
    return { notFound: true };
  }
}