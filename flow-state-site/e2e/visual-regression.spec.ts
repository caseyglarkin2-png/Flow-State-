import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for Adoption Slider UI
 * 
 * Captures baseline screenshots at different viewport sizes.
 * If UI changes, Playwright will detect pixel differences and block merge.
 */

test.describe('Visual Regression - Adoption Slider', () => {
  test('ROI page with adoption slider (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/roi');
    
    // Wait for CoverageSlider to render
    await expect(page.locator('input[type="range"]')).toBeVisible();
    
    // Screenshot the whole page
    await expect(page).toHaveScreenshot('roi-adoption-slider-desktop.png');
  });

  test('ROI page at 25% adoption (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/roi');
    
    // Wait for slider
    const slider = page.locator('input[type="range"]');
    await slider.fill('25');
    
    // Wait for DOM to update
    await page.waitForTimeout(200);
    
    // Screenshot
    await expect(page).toHaveScreenshot('roi-adoption-slider-25pct-desktop.png');
  });

  test('ROI page with adoption slider (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/roi');
    
    // Wait for CoverageSlider to render
    await expect(page.locator('input[type="range"]')).toBeVisible();
    
    // Screenshot
    await expect(page).toHaveScreenshot('roi-adoption-slider-mobile.png');
  });

  test('Diagnostic page adoption context (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/diagnostic');
    
    // Wait for adoption context section
    await expect(page.getByText(/adoption.*scenarios/i)).toBeVisible();
    
    // Screenshot the adoption context box
    const adoptionBox = page.locator('text=/adoption/i').first().locator('../..');
    await expect(adoptionBox).toHaveScreenshot('diagnostic-adoption-context.png');
  });

  test('CoverageSlider component isolated (desktop)', async ({ page }) => {
    // Visit ROI page and screenshot just the slider component
    await page.setViewportSize({ width: 600, height: 400 });
    await page.goto('/roi');
    
    // Find the slider group
    const sliderGroup = page.locator('div[role="group"]').first();
    await expect(sliderGroup).toBeVisible();
    
    // Screenshot just the slider
    await expect(sliderGroup).toHaveScreenshot('coverage-slider-component.png');
  });

  test('Home page (baseline)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    
    // Baseline screenshot for regression detection
    await expect(page).toHaveScreenshot('home-baseline.png');
  });
});

test.describe('Visual Regression - Interactive States', () => {
  test('CoverageSlider with 5% preset selected', async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 300 });
    await page.goto('/roi');
    
    // Find preset buttons
    const buttons = page.locator('button');
    
    // Click first button (5%)
    await buttons.first().click();
    await page.waitForTimeout(100);
    
    const sliderGroup = page.locator('div[role="group"]').first();
    await expect(sliderGroup).toHaveScreenshot('coverage-slider-preset-5pct.png');
  });

  test('CoverageSlider with 50% preset selected', async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 300 });
    await page.goto('/roi');
    
    // Find and click the last preset button (50%)
    const buttons = page.locator('button');
    const lastButton = buttons.last();
    await lastButton.click();
    await page.waitForTimeout(100);
    
    const sliderGroup = page.locator('div[role="group"]').first();
    await expect(sliderGroup).toHaveScreenshot('coverage-slider-preset-50pct.png');
  });
});
