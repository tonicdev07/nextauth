/** @type {import('next').NextConfig} */

const dotenv = require("dotenv");
dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: 'https://cdn.jsdelivr.net/gh/dheereshagrwal/colored-icons@1.6.8/ci.min.css',
  env: {
    NEXTAUTH_SECRET: "Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=",
  },
};

module.exports = nextConfig;
