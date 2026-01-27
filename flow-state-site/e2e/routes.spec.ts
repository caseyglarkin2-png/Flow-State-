import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// ═══════════════════════════════════════════════════════════════════
// NEW IA ROUTES (Jan 2026)
// Primary: /, /product, /solutions, /roi, /procurement, /contact
// Utility: /privacy, /terms
// ═══════════════════════════════════════════════════════════════════

// Routes that must return 200 directly
const PRIMARY_ROUTES = [
  '/',
  '/product',
  '/solutions',
  '/roi',
  '/procurement',
  '/contact',
  '/privacy',
  '/terms',
];

// Routes that should redirect (301) to primary routes
const REDIRECT_ROUTES = [
  { source: '/yardbuilder', target: '/roi' },
  { source: '/singularity', target: '/roi' },
  { source: '/pricing', target: '/roi' },
  { source: '/diagnostic', target: '/roi' },
  { source: '/proof', target: '/procurement' },
  { source: '/resources', target: '/procurement' },
  { source: '/risk', target: '/procurement' },
  { source: '/about', target: '/' },
  { source: '/faq', target: '/contact' },
  { source: '/qualify', target: '/contact?intent=qualify' },
  { source: '/demo', target: '/contact?intent=demo' },
  { source: '/co-development', target: '/contact?intent=partnership' },
];

test.describe('Route Smoke Tests — New IA', () => {
  // Test primary routes return 200
  for (const route of PRIMARY_ROUTES) {
    test(`${route} should return 200`, async ({ page }) => {
      const response = await page.goto(`${BASE_URL}${route}`);
      expect(response?.status()).toBe(200);
      
      // Verify no error boundary rendered
      const errorText = await page.textContent('body');
      expect(errorText).not.toContain('Application error');
      expect(errorText).not.toContain('500');
    });
  }

  // Test redirects work correctly
  for (const { source, target } of REDIRECT_ROUTES) {
    test(`${source} should redirect to ${target}`, async ({ page }) => {
      const response = await page.goto(`${BASE_URL}${source}`, { waitUntil: 'domcontentloaded' });
      
      // Should have been redirected
      const finalUrl = page.url();
      expect(finalUrl).toContain(target.split('?')[0]); // Check base path
      
      // Final page should be 200
      expect(response?.status()).toBe(200);
    });
  }

  test('Archive routes should be noindexed', async ({ page }) => {
    await page.goto(`${BASE_URL}/archive/test`);
    
    const robotsMeta = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robotsMeta).toContain('noindex');
  });

  test('All CTAs should be valid links', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    
    // Check primary CTA links exist and are valid
    const links = await page.locator('a[href*="/contact"], a[href*="/roi"], a[href*="/procurement"]').all();
    expect(links.length).toBeGreaterThan(0);
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toContain('undefined');
    }
  });

  test('Contact form should render', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    
    // Wait for form to load (handles Suspense)
    await page.waitForSelector('form', { timeout: 5000 });
    
    const form = await page.locator('form').count();
    expect(form).toBeGreaterThan(0);
  });

  test('ROI calculator should render', async ({ page }) => {
    await page.goto(`${BASE_URL}/roi`);
    
    const calculator = await page.locator('input[type="number"]').count();
    expect(calculator).toBeGreaterThan(0);
  });

  test('Navigation has 5 items on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/`);
    
    // Check nav links exist
    const navLinks = await page.locator('nav a').all();
    // Logo + 4 nav items + CTA = at least 5 links
    expect(navLinks.length).toBeGreaterThanOrEqual(5);
  });

  test('Mobile menu works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/`);
    
    // Find and click hamburger menu
    const menuButton = page.locator('button[aria-label*="menu"]');
    await menuButton.click();
    
    // Mobile nav should be visible
    const mobileNav = page.locator('text=Product');
    await expect(mobileNav).toBeVisible();
  });
});
