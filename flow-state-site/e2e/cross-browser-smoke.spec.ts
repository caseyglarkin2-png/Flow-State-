import { test, expect } from '@playwright/test';

/**
 * Cross-Browser Smoke Tests
 * Validates critical paths across configured browsers (chromium, firefox, webkit)
 * Focus: No crashes, CTA visibility, responsive behavior
 */

test.describe('Cross-Browser Smoke', () => {
  test('home loads and shows hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /first.*yard network system/i })).toBeVisible();
  });

  test('primary CTA visible and clickable', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByRole('link', { name: /calculate your yard tax/i }).first();
    await expect(cta).toBeVisible();
    expect(await cta.isEnabled()).toBe(true);
  });

  test('protocol animation renders', async ({ page }) => {
    await page.goto('/');
    const animation = page.getByRole('region', { name: /protocol sequence animation/i });
    await expect(animation).toBeVisible();
  });

  test('cards section renders', async ({ page }) => {
    await page.goto('/');
    const cardsSection = page.getByRole('heading', { name: /visualize protocol adoption/i });
    await expect(cardsSection).toBeVisible();
  });

  test('roi page loads', async ({ page }) => {
    await page.goto('/roi');
    await expect(page.getByRole('heading', { name: /roi model/i })).toBeVisible();
  });

  test('diagnostic page loads', async ({ page }) => {
    await page.goto('/diagnostic');
    await expect(page.getByRole('heading', { name: /diagnostic/i })).toBeVisible();
  });
});
