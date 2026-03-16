/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Forces Vercel to do a completely fresh rebuild of all static pages every deployment
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },

  images: {
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
    unoptimized: false,
  },

  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.infrastructureLogging = {
        level: 'error',
      };
    }
    return config;
  },
}

module.exports = nextConfig;
```

Push this, wait for Vercel to finish, then open:
```
