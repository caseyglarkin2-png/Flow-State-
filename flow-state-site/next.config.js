const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  
  // GLSL/Shader file imports configuration
  // Turbopack config (Next.js 16+ default bundler)
  turbopack: {
    rules: {
      // Import GLSL shader files as raw strings
      '*.glsl': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
      '*.vert': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
      '*.frag': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
      '*.vs': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
      '*.fs': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
  
  // Webpack fallback for shader imports (if Turbopack disabled)
  webpack: (config, { isServer }) => {
    // Add raw-loader for GLSL shader files
    config.module.rules.push({
      test: /\.(glsl|vert|frag|vs|fs)$/,
      type: 'asset/source',
    });
    return config;
  },
  
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
      "connect-src 'self' https://hcaptcha.com https://*.hcaptcha.com https://vercel.live https://vitals.vercel-insights.com https://*.sentry.io https://*.ingest.sentry.io",
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
  async redirects() {
    return [
      // Old archetype routes -> new canonical routes
      {
        source: "/solutions/archetypes/dry-van-reefer",
        destination: "/solutions/dry-van",
        permanent: true,
      },
      {
        source: "/solutions/archetypes/dry-van-reefer/",
        destination: "/solutions/dry-van",
        permanent: true,
      },
      {
        source: "/solutions/archetypes/intermodal",
        destination: "/solutions/intermodal",
        permanent: true,
      },
      {
        source: "/solutions/archetypes/intermodal/",
        destination: "/solutions/intermodal",
        permanent: true,
      },
      {
        source: "/solutions/archetypes/flatbed-industrial",
        destination: "/solutions/flatbed",
        permanent: true,
      },
      {
        source: "/solutions/archetypes/flatbed-industrial/",
        destination: "/solutions/flatbed",
        permanent: true,
      },
      {
        source: "/solutions/archetypes/tanker-hazmat",
        destination: "/solutions/tanker",
        permanent: true,
      },
      {
        source: "/solutions/archetypes/tanker-hazmat/",
        destination: "/solutions/tanker",
        permanent: true,
      },
      // catch-all if you had other variants
      {
        source: "/solutions/archetypes/:path*",
        destination: "/solutions",
        permanent: true,
      },
      // Blog to Resources redirects
      {
        source: '/blog/',
        destination: '/resources/',
        permanent: true,
      },
      {
        source: '/blog/cargo-theft-prevention/',
        destination: '/resources/guides/cargo-theft-prevention/',
        permanent: true,
      },
      {
        source: '/blog/network-effect-yard-automation/',
        destination: '/resources/guides/network-effect-yard-automation/',
        permanent: true,
      },
      {
        source: '/blog/ctpat-tsa-compliance/',
        destination: '/resources/guides/ctpat-tsa-compliance/',
        permanent: true,
      },
      {
        source: '/blog/yard-tax-calculator/',
        destination: '/diagnostic/',
        permanent: true,
      },
      {
        source: '/blog/primo-singularity-simulations/',
        destination: '/resources/simulations/',
        permanent: true,
      },
    ];
  },
};

// Sentry configuration
const sentryWebpackPluginOptions = {
  // Suppress logs during build
  silent: true,
  
  // Upload source maps for better stack traces
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  
  // Only upload source maps in production builds
  hideSourceMaps: true,
  
  // Disable source map uploading if no auth token
  disableServerWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN,
  disableClientWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN,
};

// Wrap with bundle analyzer, then Sentry
module.exports = withSentryConfig(withBundleAnalyzer(nextConfig), sentryWebpackPluginOptions);
