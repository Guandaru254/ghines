import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

/**
 * Sanity Client Configuration
 * This connects your Next.js frontend to the 'm2kkfzho' project.
 */
export const client = createClient({
  projectId: "m2kkfzho", 
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  if (!source) return '';
  return builder.image(source);
}

/**
 * NEW: The specific query for your News Page.
 * This fetches exactly what the old Strapi code used to, but from Sanity.
 */
export async function getAllNews() {
  const query = `*[_type == "newsStory"] | order(publishedDate desc) {
    title,
    "slug": slug.current,
    publishedDate,
    description,
    author,
    image,
    content
  }`;
  return await client.fetch(query);
}