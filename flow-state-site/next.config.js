/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // Canonical production build: standard Next.js output for Vercel.
  // (Required for API routes / server actions / conversion forms.)
  trailingSlash: true,
  images: {
    // Allow Next image optimization on Vercel.
    unoptimized: false,
  },
  transpilePackages: [
    'maplibre-gl',
    'react-map-gl',
    '@deck.gl/core',
    '@deck.gl/layers',
    '@deck.gl/react',
    '@deck.gl/geo-layers',
  ],
  async headers() {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "img-src 'self' data: blob: https://vercel.com https://*.vercel.com https://hcaptcha.com https://*.hcaptcha.com",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline' https://hcaptcha.com https://*.hcaptcha.com",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://hcaptcha.com https://*.hcaptcha.com https://vercel.live",
      "connect-src 'self' https://hcaptcha.com https://*.hcaptcha.com https://vercel.live https://vitals.vercel-insights.com",
      "frame-src https://hcaptcha.com https://*.hcaptcha.com https://vercel.live",
      "form-action 'self'",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
      {
        // Force no-cache for HTML pages to ensure crawlers get fresh content
        source: '/((?!_next|api).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
