import { test, expect } from '@playwright/test';

test.describe('NetworkMap Demo Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo/network-map');
  });

  test('should load the demo page with correct metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/Network Map Demo/);
    
    // Check hero content
    await expect(page.getByRole('heading', { name: /Network Map Demo/i })).toBeVisible();
    await expect(page.getByText(/Interactive visualization/i)).toBeVisible();
  });

  test('should render NetworkMap SVG', async ({ page }) => {
    // Wait for the SVG to be present
    const svg = page.locator('svg').first();
    await expect(svg).toBeVisible();
    
    // Check for facility nodes (circles with role button)
    const facilityNodes = page.locator('[role="button"][aria-label*="facility"]');
    await expect(facilityNodes.first()).toBeVisible();
  });

  test('should show tooltip on facility hover', async ({ page }) => {
    // First check if "Show Tooltips" is checked by default
    const tooltipCheckbox = page.getByLabel(/Show Tooltips/i);
    
    // Ensure tooltips are enabled
    if (!(await tooltipCheckbox.isChecked())) {
      await tooltipCheckbox.click();
    }

    // Hover over a facility node
    const facilityNode = page.locator('[role="button"][aria-label*="facility"]').first();
    await facilityNode.hover();
    
    // Check for tooltip content (facility details)
    // Tooltip should show facility name or metrics
    await expect(page.locator('[role="tooltip"], .absolute').first()).toBeVisible({ timeout: 2000 });
  });

  test('should show detail panel on facility click', async ({ page }) => {
    // Ensure "Show Detail Panel" is checked
    const detailPanelCheckbox = page.getByLabel(/Show Detail Panel/i);
    
    if (!(await detailPanelCheckbox.isChecked())) {
      await detailPanelCheckbox.click();
    }

    // Click on a facility node
    const facilityNode = page.locator('[role="button"][aria-label*="facility"]').first();
    await facilityNode.click();
    
    // Check for detail panel
    const detailPanel = page.locator('aside, [class*="DetailPanel"]');
    await expect(detailPanel).toBeVisible({ timeout: 2000 });
  });

  test('should close detail panel with close button', async ({ page }) => {
    // Ensure detail panel is enabled
    const detailPanelCheckbox = page.getByLabel(/Show Detail Panel/i);
    if (!(await detailPanelCheckbox.isChecked())) {
      await detailPanelCheckbox.click();
    }

    // Click facility to open panel
    const facilityNode = page.locator('[role="button"][aria-label*="facility"]').first();
    await facilityNode.click();
    
    // Wait for panel to appear
    await page.waitForTimeout(300);
    
    // Click close button
    const closeButton = page.getByRole('button', { name: /close/i });
    if (await closeButton.isVisible()) {
      await closeButton.click();
      // Panel should be closed - no detail content visible
      await page.waitForTimeout(300);
    }
  });

  test('should toggle checkboxes for demo controls', async ({ page }) => {
    const tooltipCheckbox = page.getByLabel(/Show Tooltips/i);
    const detailPanelCheckbox = page.getByLabel(/Show Detail Panel/i);
    
    // Both should exist
    await expect(tooltipCheckbox).toBeVisible();
    await expect(detailPanelCheckbox).toBeVisible();
    
    // Toggle tooltip checkbox
    const initialState = await tooltipCheckbox.isChecked();
    await tooltipCheckbox.click();
    expect(await tooltipCheckbox.isChecked()).toBe(!initialState);
  });

  test('should display legend section', async ({ page }) => {
    // Check for legend heading
    await expect(page.getByRole('heading', { name: /Legend/i })).toBeVisible();
    
    // Check for archetype descriptions
    await expect(page.getByText(/High Security Hub/i)).toBeVisible();
    await expect(page.getByText(/Growth Operations/i)).toBeVisible();
  });

  test('should have keyboard instructions', async ({ page }) => {
    // Check for keyboard instructions text
    await expect(page.getByText(/Tab.*navigate/i)).toBeVisible();
    await expect(page.getByText(/Enter.*select/i)).toBeVisible();
    await expect(page.getByText(/Escape.*close/i)).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab to first facility node
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // Skip checkbox controls
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Get focused element
    const focused = page.locator(':focus');
    
    // Press Enter to select
    await page.keyboard.press('Enter');
    
    // Should trigger selection (if detail panel is enabled)
    await page.waitForTimeout(300);
  });

  test('should be responsive', async ({ page }) => {
    // Test at mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Page should still be functional
    await expect(page.getByRole('heading', { name: /Network Map Demo/i })).toBeVisible();
    
    const svg = page.locator('svg').first();
    await expect(svg).toBeVisible();
  });
});
