/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ['maplibre-gl', 'react-map-gl', '@deck.gl/core', '@deck.gl/layers', '@deck.gl/react', '@deck.gl/geo-layers'],
};

module.exports = nextConfig;
