// utils/extractImageUrl.js
export default function extractImageUrl(post) {
  try {
    const imageData = post?.attributes?.Image?.data?.attributes;
    if (!imageData) return null;

    const url = imageData.url;
    if (!url) return null;

    // If it's a relative URL, prepend Strapi base
    const base = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || '';
    return url.startsWith('http') ? url : `${base}${url}`;
  } catch (error) {
    console.error('[extractImageUrl] Failed to extract image URL:', error);
    return null;
  }
}
