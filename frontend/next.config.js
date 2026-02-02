{import('next').NextConfig} 
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization configuration for Sanity CDN
  images: {
    domains: [
      'cdn.sanity.io',
      'm2kkfzho.api.sanity.io',
      // Add any other image domains you use
      'light-light-5ba7f2d7f7.media.strapiapp.com', // Legacy Strapi (can remove later)
    ],
    // Allow unoptimized images as fallback
    unoptimized: false,
  },

  // Webpack configuration (if needed for custom loaders)
  webpack: (config, { isServer }) => {
    // Add any custom webpack config here
    return config;
  },
}

module.exports = nextConfig;






