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
  useCdn: true, // Enable CDN for faster performance
});

const builder = imageUrlBuilder(client);

/**
 * Robust Image URL Builder
 * Safely handles missing images by returning a placeholder string
 */
export function urlFor(source) {
  if (!source || !source.asset) {
    console.warn('⚠️ urlFor called with invalid source:', source);
    return { 
      url: () => '/images/blog/placeholder.jpg',
      width: () => ({ url: () => '/images/blog/placeholder.jpg' }),
      height: () => ({ url: () => '/images/blog/placeholder.jpg' }),
    };
  }
  
  try {
    return builder.image(source);
  } catch (error) {
    console.error('❌ Error building image URL:', error);
    return { 
      url: () => '/images/blog/placeholder.jpg',
      width: () => ({ url: () => '/images/blog/placeholder.jpg' }),
      height: () => ({ url: () => '/images/blog/placeholder.jpg' }),
    };
  }
}

/**
 * FETCH ALL NEWS
 * Refined GROQ query with proper error handling
 */
export async function getAllNews() {
  const query = `*[_type == "newsStory"] | order(coalesce(publishedDate, _createdAt) desc) {
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    "publishedDate": coalesce(publishedDate, _createdAt),
    "description": coalesce(description, ""),
    "author": coalesce(author, "The Ghines Foundation"),
    image {
      asset -> {
        _id,
        url
      }
    },
    content
  }`;
  
  try {
    const data = await client.fetch(query);
    
    if (!data || !Array.isArray(data)) {
      console.warn('⚠️ Sanity returned invalid data structure');
      return [];
    }
    
    console.log(`✅ Fetched ${data.length} posts from Sanity`);
    
    // Deep clone to ensure the object is plain JSON for Next.js serialization
    return JSON.parse(JSON.stringify(data || []));
  } catch (error) {
    console.error("❌ Sanity Fetch Error:", error);
    return [];
  }
}

/**
 * FETCH SINGLE NEWS POST BY SLUG
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
    image {
      asset -> {
        _id,
        url
      }
    },
    content
  }`;
  
  try {
    const data = await client.fetch(query, { slug });
    
    if (!data) {
      console.warn(`⚠️ No post found for slug: ${slug}`);
      return null;
    }
    
    console.log(`✅ Fetched post: "${data.title}"`);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error(`❌ Error fetching post with slug "${slug}":`, error);
    return null;
  }
}