/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.myanimelist.net',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
