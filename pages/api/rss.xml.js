// C:\Users\PC\Desktop\Companies\Ghenis\frontend\pages\api\rss.xml.js

import blogs from '../../api/blogs';

// A helper function to get the base URL from the request
const getBaseUrl = (req) => {
    // Check if we are in a Vercel environment
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    return `${protocol}://${host}`;
};

const generateRssFeed = (baseUrl) => {
    // RSS Feed Header
    const feedHeader = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>The Ghines Foundation Blog</title>
        <link>${baseUrl}</link>
        <description>The latest news and updates from The Ghines Foundation.</description>
        <language>en-us</language>
        <atom:link href="${baseUrl}/api/rss.xml" rel="self" type="application/rss+xml" />
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`;

    // Filter out any posts that don't have the necessary data
    const validBlogs = blogs.filter(post => post.slug && post.title2 && post.description && post.id && post.date);

    // RSS Feed Items
    const feedItems = validBlogs.map(post => {
        // Construct the URL for each blog post
        const postLink = `${baseUrl}/blog/${post.slug}`;

        // Ensure a valid date format for the RSS feed
        const pubDate = new Date(post.date).toUTCString();

        return `
            <item>
                <title>${post.title2}</title>
                <link>${postLink}</link>
                <guid isPermaLink="false">${post.id}</guid>
                <description>${post.description}</description>
                <pubDate>${pubDate}</pubDate>
            </item>`;
    }).join('');

    // RSS Feed Footer
    const feedFooter = `
      </channel>
    </rss>`;

    return feedHeader + feedItems + feedFooter;
};

export default function Rss(req, res) {
    const baseUrl = getBaseUrl(req);
    const rssXml = generateRssFeed(baseUrl);

    res.setHeader('Content-Type', 'application/xml');
    res.write(rssXml);
    res.end();
}