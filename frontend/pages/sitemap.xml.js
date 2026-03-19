import { client } from '../lib/sanity';

const EXTERNAL_DATA_URL = 'https://ghinesfoundation.org/blog-single';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://ghinesfoundation.org</loc>
     </url>
     <url>
       <loc>https://ghinesfoundation.org/who-we-are</loc>
     </url>
     <url>
       <loc>https://ghinesfoundation.org/what-we-do</loc>
     </url>
     <url>
       <loc>https://ghinesfoundation.org/leadership</loc>
     </url>
     <url>
       <loc>https://ghinesfoundation.org/resources</loc>
     </url>
     <url>
       <loc>https://ghinesfoundation.org/news-and-stories</loc>
     </url>
     <url>
       <loc>https://ghinesfoundation.org/contact</loc>
     </url>
     <url>
       <loc>https://ghinesfoundation.org/get-involved</loc>
     </url>

     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // Fetch all slugs for posts that are defined
  const query = `*[_type == "newsStory" && defined(slug.current)] { "slug": slug.current }`;
  const posts = await client.fetch(query);

  // Generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // Send the XML to the browser/crawler
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;