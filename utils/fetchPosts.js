// utils/fetchPosts.js
export const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export async function fetchPosts() {
  try {
    const res = await fetch(`${STRAPI_API_URL}/api/news-stories?populate=*&sort[0]=PublishedDate:desc`);
    const json = await res.json();

    console.log('[STRAPI FETCH]', `${STRAPI_API_URL}/api/news-stories?populate=*`);
    if (!json?.data) {
      console.error('[ERROR] No data returned from Strapi');
      return [];
    }

    const posts = json.data.map((item) => {
      const image = item.Image;
      const imageUrl = image?.url
        ? image.url.startsWith('http')
          ? image.url
          : `${STRAPI_API_URL}${image.url}`
        : null;

      return {
        id: item.id,
        title: item.Title,
        author: item.Author,
        publishedDate: item.PublishedDate,
        content: item.Content,
        photoCredit: item.PhotoCredit,
        slug: item.Slug,
        imageUrl,
      };
    });

    console.log(`[SUCCESS] Processed ${posts.length} posts.`);
    console.log(`[SUCCESS] First post image: ${posts[0]?.imageUrl || 'null'}`);

    return posts;
  } catch (err) {
    console.error('[FETCH ERROR]', err);
    return [];
  }
}
