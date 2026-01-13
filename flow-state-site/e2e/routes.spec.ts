import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Critical routes that must return 200
const REQUIRED_ROUTES = [
  '/',
  '/product',
  '/solutions',
  '/risk',
  '/resources/procurement',
  '/roi',
  '/yardbuilder',
  '/qualify',
  '/singularity',
  '/pricing',
  '/blog',
  '/contact',
  '/privacy',
  '/terms',
  '/about',
  '/faq',
  '/integrations',
  '/implementation',
  '/network-effect',
];

test.describe('Route Smoke Tests', () => {
  for (const route of REQUIRED_ROUTES) {
    test(`${route} should return 200`, async ({ page }) => {
      const response = await page.goto(`${BASE_URL}${route}`);
      expect(response?.status()).toBe(200);
      
      // Verify no error boundary rendered
      const errorText = await page.textContent('body');
      expect(errorText).not.toContain('Application error');
      expect(errorText).not.toContain('500');
    });
  }

  test('All CTAs should be valid links', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    
    // Check primary CTA links exist and are valid
    const links = await page.locator('a[href*="/contact"], a[href*="/roi"], a[href*="/qualify"]').all();
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
});
