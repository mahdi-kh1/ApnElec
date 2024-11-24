/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable React strict mode (only if necessary)
  reactStrictMode: false,

  // Environment variables
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Webpack configuration to handle server-side modules in client builds
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Exclude `fs` module
        os: false, // Exclude `os` module
      };
    }
    return config;
  },
};

export default nextConfig;
