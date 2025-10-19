/** next.config.js
 * Ensure you add your media host (or the strapiapp media host) to the remotePatterns/domains.
 * Restart Next after changing this file.
 */
module.exports = {
  reactStrictMode: true,
  images: {
    // If you use next/image, prefer remotePatterns. This covers the Strapi media host.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'light-light-5ba7f2d7f7.media.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'light-light-5ba7f2d7f7.strapiapp.com',
        pathname: '/**',
      }
    ],
    // domains: ['light-light-5ba7f2d7f7.media.strapiapp.com'], // alternative
  },
};
