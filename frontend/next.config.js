/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    // remotePatterns is the modern, more secure way to handle external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'light-light-5ba7f2d7f7.media.strapiapp.com',
      }
    ],
    // If you are still using <img> tags instead of <Image /> components, 
    // unoptimized: true can sometimes help during debugging, but false is better for performance.
    unoptimized: false,
  },

  webpack: (config, { dev, isServer }) => {
    // This snippet helps silence the 'outdated direction syntax' warnings 
    // from Autoprefixer that are flooding your terminal.
    if (dev && !isServer) {
      config.infrastructureLogging = {
        level: 'error',
      };
    }
    return config;
  },
}

module.exports = nextConfig;