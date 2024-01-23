/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
