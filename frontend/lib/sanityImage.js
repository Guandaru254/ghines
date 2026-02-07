import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity';

/**
 * Initialize the Sanity Image URL Builder using your existing client configuration.
 */
const builder = imageUrlBuilder(client);

/**
 * Sanity Image Helper
 * This function takes a Sanity image object and returns a processed URL string.
 * * NOTE: This function ends with .url(), which means it returns a STRING.
 * In your components, do NOT call .url() again (e.g., use urlFor(img), not urlFor(img).url()).
 */
export function urlFor(source) {
  // Guard clause: if no image source is provided, return a placeholder or null
  if (!source || !source.asset) {
    return '/images/placeholder.jpg'; 
  }

  try {
    return builder
      .image(source)
      .auto('format') // Automatically uses WebP for browsers that support it
      .fit('max')    // Ensures the image doesn't exceed its original dimensions
      .url();        // Returns the final URL as a string
  } catch (error) {
    console.error("Error building Sanity image URL:", error);
    return '/images/placeholder.jpg';
  }
}