import { test, expect } from '@playwright/test';

/**
 * Responsive Overflow & Touch Target Audit
 * 
 * Tests all key pages at multiple breakpoints to ensure:
 * - No horizontal overflow (no off-screen scrollbar)
 * - Touch targets are >= 44x44px (iOS Human Interface Guidelines)
 * - Text is readable (font-size >= 12px)
 * - Forms are accessible on mobile
 */

const KEY_PAGES = [
  '/',
  '/roi',
  '/diagnostic',
  '/product',
  '/about',
  '/contact',
  '/pricing',
];

const BREAKPOINTS = {
  mobile: { width: 375, height: 667, name: 'Mobile (iPhone SE)' },
  tablet: { width: 768, height: 1024, name: 'Tablet (iPad)' },
  desktop: { width: 1280, height: 720, name: 'Desktop' },
};

test.describe('Responsive Audit', () => {
  for (const path of KEY_PAGES) {
    for (const [key, viewport] of Object.entries(BREAKPOINTS)) {
      test(`${path} - ${viewport.name}: No horizontal overflow`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(path);

        // Wait for page to load
        await page.waitForLoadState('networkidle');

        // Check for horizontal scrollbar
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = viewport.width;

        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
      });

      if (key === 'mobile') {
        test(`${path} - Mobile: Touch targets >= 44x44px`, async ({ page }) => {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await page.goto(path);

          // Get all interactive elements (buttons, links)
          const buttons = await page.locator('button, a[href]').all();

          for (const button of buttons) {
            const box = await button.boundingBox();
            if (box && box.width > 0 && box.height > 0) {
              // iOS Human Interface Guidelines: 44x44px minimum
              expect(box.width).toBeGreaterThanOrEqual(44);
              expect(box.height).toBeGreaterThanOrEqual(44);
            }
          }
        });

        test(`${path} - Mobile: Text readable (>= 12px)`, async ({ page }) => {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await page.goto(path);

          // Check all text elements
          const textElements = await page.locator('p, span, a, button, h1, h2, h3, h4, h5, h6').all();

          for (const element of textElements) {
            const fontSize = await element.evaluate((el) => {
              const style = window.getComputedStyle(el);
              return parseFloat(style.fontSize);
            });

            // Minimum 12px for readability
            if (fontSize > 0) {
              expect(fontSize).toBeGreaterThanOrEqual(12);
            }
          }
        });
      }
    }
  }

  test('Mobile: Forms accessible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/contact');

    // Check for form elements
    const inputs = await page.locator('input, textarea, select').all();

    for (const input of inputs) {
      // Inputs should be visible (not hidden off-screen)
      const box = await input.boundingBox();
      if (box) {
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.y).toBeGreaterThanOrEqual(0);
      }

      // Inputs should have proper labels (accessibility)
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      const id = await input.getAttribute('id');
      
      // Should have at least one: aria-label, aria-labelledby, or associated label
      const hasLabel = ariaLabel || ariaLabelledBy || (id && await page.locator(`label[for="${id}"]`).count() > 0);
      expect(hasLabel).toBeTruthy();
    }
  });
});
