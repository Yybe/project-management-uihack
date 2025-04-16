/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Disable SWC minification
  images: {
    domains: [],
  },
  // Disable some features that might be causing issues
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Disable webpack5 cache
  webpack: (config, { dev, isServer }) => {
    // Disable cache in development
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
