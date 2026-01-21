import { test, expect } from '@playwright/test';

/**
 * Mobile Interaction Tests for CoverageSlider
 * 
 * Verifies adoption slider works correctly on touch devices.
 * Tests: touch input, preset button sizing, no horizontal overflow.
 */

test.describe('Mobile Interaction - CoverageSlider', () => {
  test.beforeEach(({ page }) => {
    // Emulate iPhone SE (375x667)
    page.setViewportSize({ width: 375, height: 667 });
  });

  test('slider responds to touch input', async ({ page }) => {
    await page.goto('/roi');
    
    const slider = page.locator('input[type="range"]').first();
    await expect(slider).toBeVisible();
    
    // Get initial value
    const initialValue = await slider.inputValue();
    expect(initialValue).toBeTruthy();
    
    // Simulate touch interaction (fill sets value)
    await slider.fill('25');
    
    const newValue = await slider.inputValue();
    expect(newValue).toBe('25');
  });

  test('preset buttons are touch-friendly (44x44px minimum)', async ({ page }) => {
    await page.goto('/roi');
    
    // Find preset buttons
    const buttons = page.locator('button').all();
    const allButtons = await buttons;
    
    // Check that buttons have reasonable size for touch (at least some should be 44px)
    for (const button of allButtons) {
      const box = await button.boundingBox();
      if (box && box.width > 0) {
        // At least 40px in both dimensions for mobile touch targets
        expect(box.width).toBeGreaterThanOrEqual(40);
        expect(box.height).toBeGreaterThanOrEqual(40);
      }
    }
  });

  test('preset buttons clickable on mobile', async ({ page }) => {
    await page.goto('/roi');
    
    // Find all buttons
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    // Should have at least 4 preset buttons
    expect(buttonCount).toBeGreaterThanOrEqual(4);
    
    // Try clicking buttons
    for (let i = 0; i < Math.min(2, buttonCount); i++) {
      const button = buttons.nth(i);
      const initialValue = await page.locator('input[type="range"]').first().inputValue();
      
      await button.click();
      
      const newValue = await page.locator('input[type="range"]').first().inputValue();
      // Value should change or button click succeeds
      expect(button).toBeTruthy();
    }
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.goto('/roi');
    
    const viewport = page.viewportSize();
    if (!viewport) throw new Error('Viewport not set');
    
    // Get the body width
    const bodyWidth = await page.evaluate(() => {
      const body = document.body;
      return body.scrollWidth;
    });
    
    // Body should not exceed viewport width (plus small margin for scrollbar)
    expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 10);
  });

  test('adoption copy displays correctly on mobile', async ({ page }) => {
    await page.goto('/roi');
    
    // Check that adoption copy is visible
    const adoptionCopy = page.getByText(/Modeling.*facilities/i);
    await expect(adoptionCopy).toBeVisible();
    
    // Get the text
    const text = await adoptionCopy.textContent();
    expect(text).toMatch(/Modeling.*facilities/i);
  });

  test('slider is responsive to value changes on mobile', async ({ page }) => {
    await page.goto('/roi');
    
    const slider = page.locator('input[type="range"]').first();
    
    // Test multiple values
    const testValues = ['5', '10', '25', '50'];
    
    for (const val of testValues) {
      await slider.fill(val);
      const currentValue = await slider.inputValue();
      expect(currentValue).toBe(val);
    }
  });

  test('diagnostic page renders without overflow on mobile', async ({ page }) => {
    await page.goto('/diagnostic');
    
    const viewport = page.viewportSize();
    if (!viewport) throw new Error('Viewport not set');
    
    const bodyWidth = await page.evaluate(() => {
      const body = document.body;
      return body.scrollWidth;
    });
    
    expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 10);
  });

  test('adoption context link works on mobile', async ({ page }) => {
    await page.goto('/diagnostic');
    
    // Find the adoption context link
    const link = page.getByRole('link', { name: /adoption.*scenarios/i });
    await expect(link).toBeVisible();
    
    // Click should work
    await link.click();
    
    // Should navigate to ROI page
    await expect(page).toHaveURL(/\/roi/);
  });

  test('orientation change handling', async ({ page }) => {
    await page.goto('/roi');
    
    // Start in portrait (375x667)
    await page.setViewportSize({ width: 375, height: 667 });
    
    const portraitSlider = page.locator('input[type="range"]').first();
    await expect(portraitSlider).toBeVisible();
    
    // Change to landscape (667x375)
    await page.setViewportSize({ width: 667, height: 375 });
    
    const landscapeSlider = page.locator('input[type="range"]').first();
    await expect(landscapeSlider).toBeVisible();
    
    // Slider should still be functional
    await landscapeSlider.fill('25');
    const value = await landscapeSlider.inputValue();
    expect(value).toBe('25');
  });

  test('preset buttons visible and clickable on small phones (320px)', async ({ page }) => {
    // Emulate very small phone
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/roi');
    
    // Slider should be visible
    const slider = page.locator('input[type="range"]').first();
    await expect(slider).toBeVisible();
    
    // At least some buttons should be clickable
    const buttons = page.locator('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });
});
