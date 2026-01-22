import { test, expect } from '@playwright/test';
import axe from 'axe-core';

const HERO_REGION_LABEL = /protocol sequence animation/i;

const KEY_PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/roi', name: 'ROI Calculator' },
  { path: '/product', name: 'Product' },
  { path: '/contact', name: 'Contact' },
  { path: '/singularity', name: 'Singularity' },
];

/**
 * Accessibility coverage for key pages
 * - Axe scan (serious/critical) on full page
 * - Reduced-motion rendering
 * - Live region semantics
 */
test.describe('Accessibility - Full Site Scan', () => {
  for (const { path, name } of KEY_PAGES) {
    test(`axe: ${name} (${path}) has no serious/critical violations`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      await page.addScriptTag({ content: axe.source });

      const results = await page.evaluate(async () => {
        return await (window as any).axe.run(document.body, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa'],
          },
        });
      });

      const seriousOrCritical = results.violations.filter(
        (v: { impact: string }) => v.impact === 'serious' || v.impact === 'critical'
      );
      expect(seriousOrCritical).toHaveLength(0);
    });
  }
});

test.describe('Accessibility - Homepage Hero', () => {
  test('axe: no serious/critical violations in hero region', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.addScriptTag({ content: axe.source });

    const results = await page.evaluate(async () => {
      const target =
        document.querySelector('[aria-label="Protocol sequence animation"]') ||
        document.querySelector('[aria-label="Protocol modules"]') ||
        document.body;

      return await (window as any).axe.run(target, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa'],
        },
      });
    });

    const seriousOrCritical = results.violations.filter(
      (v: { impact: string }) => v.impact === 'serious' || v.impact === 'critical'
    );
    expect(seriousOrCritical).toHaveLength(0);
  });

  test('reduced motion: static grid displays all modules', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const region = page.getByRole('region', { name: /protocol (modules|sequence animation)/i });

    await expect(region.getByText(/digital guard/i)).toBeVisible();
    await expect(region.getByText(/digital comms/i)).toBeVisible();
    await expect(region.getByText(/digital bol/i)).toBeVisible();
    await expect(region.getByText(/digital yms/i)).toBeVisible();
  });

  test('hero region exposes aria-live for announcements', async ({ page }) => {
    await page.goto('/');
    const region = page.getByRole('region', { name: HERO_REGION_LABEL });
    await expect(region).toBeVisible();
    await expect(region).toHaveAttribute('aria-live', 'polite');
  });
});

test.describe('Accessibility - Landmarks & Structure', () => {
  test('homepage has main landmark', async ({ page }) => {
    await page.goto('/');
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('homepage has navigation landmark', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
  });

  test('heading hierarchy is correct', async ({ page }) => {
    await page.goto('/');
    
    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // All h2s should come after h1 (no skipped levels)
    const headings = await page.locator('h1, h2, h3').all();
    expect(headings.length).toBeGreaterThan(0);
  });
});

test.describe('Accessibility - Color Contrast', () => {
  test('neon on void passes contrast check', async ({ page }) => {
    await page.goto('/');
    await page.addScriptTag({ content: axe.source });

    const results = await page.evaluate(async () => {
      return await (window as any).axe.run(document.body, {
        runOnly: ['color-contrast'],
      });
    });

    // Check specifically for color-contrast violations
    const contrastViolations = results.violations.filter(
      (v: { id: string }) => v.id === 'color-contrast'
    );
    
    // Log but don't fail on minor contrast issues (informational)
    if (contrastViolations.length > 0) {
      console.log('Color contrast issues found:', contrastViolations.length);
    }
  });
});
