/**
 * Lighthouse CI Configuration
 * Runs Lighthouse audits on PR and reports results
 */
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Ready in',
      startServerReadyTimeout: 60000,
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/contact',
        'http://localhost:3000/roi',
      ],
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
        // Skip flaky audits in CI
        skipAudits: [
          'uses-http2',
          'uses-long-cache-ttl',
        ],
      },
    },
    assert: {
      assertions: {
        // Performance thresholds (S8: raised from 0.85 to 0.90)
        'categories:performance': ['warn', { minScore: 0.90 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        
        // Core Web Vitals (S8: LCP target 2.5s, TBT reduced from 300 to 200)
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 200 }],
        
        // Critical accessibility checks
        'color-contrast': 'error',
        'html-has-lang': 'error',
        'image-alt': 'error',
        'link-name': 'error',
        'button-name': 'error',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
