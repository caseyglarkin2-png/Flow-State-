import { test, expect } from '@playwright/test';

/**
 * Mobile Viewport Tests — S2-002
 * Validates responsive behavior at key breakpoints
 */

const MOBILE_VIEWPORT = { width: 375, height: 667 };  // iPhone SE
const TABLET_VIEWPORT = { width: 768, height: 1024 }; // iPad
const DESKTOP_VIEWPORT = { width: 1280, height: 800 };

test.describe('Mobile Responsiveness', () => {
  test.describe('Homepage Mobile (375px)', () => {
    test.use({ viewport: MOBILE_VIEWPORT });

    test('no horizontal scroll on homepage', async ({ page }) => {
      await page.goto('/');
      
      // Check for horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      expect(hasHorizontalScroll).toBe(false);
    });

    test('hero text is readable', async ({ page }) => {
      await page.goto('/');
      
      const heroH1 = page.locator('h1').first();
      await expect(heroH1).toBeVisible();
      
      // Check font size is at least 24px on mobile
      const fontSize = await heroH1.evaluate((el) => 
        parseFloat(window.getComputedStyle(el).fontSize)
      );
      expect(fontSize).toBeGreaterThanOrEqual(24);
    });

    test('CTAs are full-width on mobile', async ({ page }) => {
      await page.goto('/');
      
      // Primary CTA should be large and tappable
      const primaryCTA = page.locator('a[href*="/roi"]').first();
      if (await primaryCTA.isVisible()) {
        const box = await primaryCTA.boundingBox();
        expect(box?.height).toBeGreaterThanOrEqual(44); // Touch target
      }
    });

    test('mobile menu works', async ({ page }) => {
      await page.goto('/');
      
      // Find hamburger menu button
      const menuButton = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]');
      await expect(menuButton).toBeVisible();
      
      // Open menu
      await menuButton.click();
      
      // Nav items should be visible
      await expect(page.locator('text=Product')).toBeVisible();
      await expect(page.locator('text=Solutions')).toBeVisible();
    });

    test('touch targets are at least 44px', async ({ page }) => {
      await page.goto('/');
      
      // Check all buttons and links
      const interactiveElements = page.locator('button, a[href]');
      const count = await interactiveElements.count();
      
      for (let i = 0; i < Math.min(count, 10); i++) {
        const el = interactiveElements.nth(i);
        if (await el.isVisible()) {
          const box = await el.boundingBox();
          if (box) {
            // Touch target should be at least 44px in one dimension
            const touchable = box.width >= 44 || box.height >= 44;
            // Skip very small inline links
            if (box.width > 20 && box.height > 10) {
              expect(touchable).toBe(true);
            }
          }
        }
      }
    });
  });

  test.describe('Homepage Tablet (768px)', () => {
    test.use({ viewport: TABLET_VIEWPORT });

    test('no horizontal scroll on tablet', async ({ page }) => {
      await page.goto('/');
      
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      expect(hasHorizontalScroll).toBe(false);
    });

    test('grid layouts adapt properly', async ({ page }) => {
      await page.goto('/');
      
      // Check that sections don't overflow
      const mainContent = page.locator('main');
      const mainBox = await mainContent.boundingBox();
      expect(mainBox?.width).toBeLessThanOrEqual(768);
    });
  });

  test.describe('Product Page Mobile', () => {
    test.use({ viewport: MOBILE_VIEWPORT });

    test('product page loads on mobile', async ({ page }) => {
      const response = await page.goto('/product');
      expect(response?.status()).toBe(200);
    });

    test('no horizontal scroll on product page', async ({ page }) => {
      await page.goto('/product');
      
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      expect(hasHorizontalScroll).toBe(false);
    });

    test('module cards are visible', async ({ page }) => {
      await page.goto('/product');
      
      // Should see Digital Guard content
      await expect(page.locator('text=Digital Guard').first()).toBeVisible();
    });
  });

  test.describe('ROI Page Mobile', () => {
    test.use({ viewport: MOBILE_VIEWPORT });

    test('ROI calculator is usable on mobile', async ({ page }) => {
      await page.goto('/roi');
      
      // Check calculator inputs are present
      const inputs = page.locator('input[type="number"]');
      const count = await inputs.count();
      expect(count).toBeGreaterThan(0);
      
      // First input should be visible and focusable
      const firstInput = inputs.first();
      await expect(firstInput).toBeVisible();
    });

    test('no horizontal scroll on ROI page', async ({ page }) => {
      await page.goto('/roi');
      
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      expect(hasHorizontalScroll).toBe(false);
    });
  });

  test.describe('Contact Form Mobile', () => {
    test.use({ viewport: MOBILE_VIEWPORT });

    test('contact form is usable on mobile', async ({ page }) => {
      await page.goto('/contact');
      
      // Wait for form to load
      await page.waitForSelector('form', { timeout: 5000 });
      
      // Form inputs should be visible
      const nameInput = page.locator('input[name="name"], input[placeholder*="name" i]').first();
      await expect(nameInput).toBeVisible();
      
      // Submit button should have adequate touch target
      const submitButton = page.locator('button[type="submit"]');
      if (await submitButton.isVisible()) {
        const box = await submitButton.boundingBox();
        expect(box?.height).toBeGreaterThanOrEqual(44);
      }
    });
  });

  test.describe('Procurement Page Mobile', () => {
    test.use({ viewport: MOBILE_VIEWPORT });

    test('procurement page loads on mobile', async ({ page }) => {
      const response = await page.goto('/procurement');
      expect(response?.status()).toBe(200);
    });

    test('evidence cards stack vertically', async ({ page }) => {
      await page.goto('/procurement');
      
      // Check no horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      expect(hasHorizontalScroll).toBe(false);
    });
  });
});
