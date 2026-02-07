import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'm2kkfzho', //
  dataset: 'production', //
  apiVersion: '2024-01-01', //
  useCdn: true, //
});

const builder = imageUrlBuilder(client); //

/**
 * Sanity image URL helper - returns URL string directly.
 * NOTE: Since this ends in .url(), do not call .url() again in your components.
 */
export function urlFor(source) {
  // Check if source exists and has a valid asset reference
  if (!source || !source.asset) {
    return '/images/blog/placeholder.jpg'; 
  }

  try {
    return builder
      .image(source)
      .auto('format')
      .fit('max')
      .url(); //
  } catch (err) {
    console.error('Sanity image error:', err);
    return '/images/blog/placeholder.jpg'; //
  }
}

/**
 * FETCH ALL NEWS
 */
export async function getAllNews() {
  const query = `*[_type == "newsStory"] | order(coalesce(publishedDate, _createdAt) desc) {
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    "publishedDate": coalesce(publishedDate, _createdAt),
    description,
    author,
    image,
    content
  }`; //

  try {
    const data = await client.fetch(query);
    console.log(`✅ Fetched ${data.length} posts from Sanity`); //
    return data || [];
  } catch (error) {
    console.error('❌ Sanity fetch error:', error);
    return [];
  }
}

/**
 * FETCH SINGLE NEWS POST
 */
export async function getNewsBySlug(slug) {
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
  }`; //

  try {
    const post = await client.fetch(query, { slug });
    if (post) {
      console.log(`✅ Fetched post: ${post.title}`); //
    }
    return post;
  } catch (error) {
    console.error('❌ Sanity slug fetch error:', error);
    return null;
  }
}