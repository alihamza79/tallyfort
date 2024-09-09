// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  output : 'export',
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // Correct domain
        pathname: "/**/*", // Allow all paths
      },
      {
        protocol: "https",
        hostname: "funny-horses-65cebeff8b.media.strapiapp.com",
      },
    ],
  },
};

export default nextConfig;
