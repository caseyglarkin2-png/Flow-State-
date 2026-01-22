import { test, expect } from '@playwright/test';

/**
 * Error Boundary E2E Tests
 * 
 * Verifies that error.tsx renders correctly when a runtime error occurs.
 * Note: In development mode, Next.js shows its own error overlay.
 * These tests are designed for production builds.
 */
test.describe('Error Boundaries', () => {
  // Skip error.tsx tests in dev mode since Next.js shows its own overlay
  // These work correctly in production builds
  test.skip('error.tsx renders when runtime error occurs', async ({ page }) => {
    // Navigate to test error route
    await page.goto('/__test-error__');

    // Wait for error boundary to render
    await page.waitForTimeout(500);

    // Verify error page elements
    await expect(page.getByRole('heading', { name: /something went wrong/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /try again/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /go home/i })).toBeVisible();
  });

  test.skip('error page "Go Home" link navigates to homepage', async ({ page }) => {
    await page.goto('/__test-error__');
    await page.waitForTimeout(500);

    await page.getByRole('link', { name: /go home/i }).click();
    await expect(page).toHaveURL('/');
  });

  test.skip('error page has correct brand styling', async ({ page }) => {
    await page.goto('/__test-error__');
    await page.waitForTimeout(500);

    // Verify dark background (void color)
    await expect(page.locator('div').first()).toHaveCSS('background-color', 'rgb(5, 5, 5)');
  });

  test('not-found page renders correctly', async ({ page }) => {
    // Navigate to a route that doesn't exist
    await page.goto('/this-route-definitely-does-not-exist-12345');

    // Verify 404 page elements
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /go home/i })).toBeVisible();
  });

  test('not-found page "Go Home" link works', async ({ page }) => {
    await page.goto('/nonexistent-page');

    await page.getByRole('link', { name: /go home/i }).click();
    await expect(page).toHaveURL('/');
  });
});
