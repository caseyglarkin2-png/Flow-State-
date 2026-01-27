import { test, expect } from '@playwright/test';

/**
 * Network Map Sharing E2E Tests
 * Validates URL state encoding, sharing, and loading.
 */
test.describe('Network Map Sharing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo/network-map');
  });

  test('displays network map demo page', async ({ page }) => {
    // Page loads with controls
    await expect(page.getByText('Show Labels')).toBeVisible();
    await expect(page.getByText('Interactive Mode')).toBeVisible();
    
    // Share button is present
    await expect(page.getByRole('button', { name: /share/i })).toBeVisible();
  });

  test('share button copies URL to clipboard', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    
    const shareButton = page.getByRole('button', { name: /share/i });
    await expect(shareButton).toBeVisible();
    
    // Click share button
    await shareButton.click();
    
    // Button should show success state
    await expect(shareButton).toHaveText(/copied|link copied/i);
    
    // Verify clipboard contains URL with hash
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('/demo/network-map');
    expect(clipboardText).toContain('#');
  });

  test('share button reverts to default state after delay', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    
    const shareButton = page.getByRole('button', { name: /share/i });
    await shareButton.click();
    
    // Should show copied state
    await expect(shareButton).toHaveText(/copied|link copied/i);
    
    // Wait for revert (3s + buffer)
    await page.waitForTimeout(3500);
    
    // Should revert to share text
    await expect(shareButton).toHaveText(/share/i);
  });

  test('shared URL loads network configuration', async ({ page }) => {
    // Create a test URL with encoded config
    // This simulates a user sharing their configuration
    const testConfig = {
      facilities: [
        { id: 'test-1', name: 'Test Hub', lat: 40.7128, lng: -74.006, type: 'distribution' as const },
        { id: 'test-2', name: 'Test DC', lat: 34.0522, lng: -118.2437, type: 'yard' as const },
      ],
      connections: [
        { from: 'test-1', to: 'test-2' }
      ],
    };
    
    const encoded = Buffer.from(JSON.stringify(testConfig)).toString('base64');
    
    // Navigate to shared URL
    await page.goto(`/demo/network-map#config=${encoded}`);
    
    // Should show shared config banner
    await expect(page.getByText(/viewing shared network/i)).toBeVisible();
  });

  test('invalid URL hash is ignored gracefully', async ({ page }) => {
    // Navigate with invalid hash
    await page.goto('/demo/network-map#config=invalid-base64-data!@#');
    
    // Page should still load normally
    await expect(page.getByText('Show Labels')).toBeVisible();
    
    // Should NOT show shared config banner (invalid config)
    await expect(page.getByText(/viewing shared network/i)).not.toBeVisible();
  });

  test('empty hash is ignored', async ({ page }) => {
    await page.goto('/demo/network-map#');
    
    // Page loads normally
    await expect(page.getByText('Show Labels')).toBeVisible();
    await expect(page.getByText(/viewing shared network/i)).not.toBeVisible();
  });

  test('controls work with shared configuration', async ({ page }) => {
    const testConfig = {
      facilities: [
        { id: 'shared-1', name: 'Shared Hub', lat: 40.7128, lng: -74.006, type: 'distribution' as const },
      ],
      connections: [],
    };
    
    const encoded = Buffer.from(JSON.stringify(testConfig)).toString('base64');
    await page.goto(`/demo/network-map#config=${encoded}`);
    
    // Banner shows
    await expect(page.getByText(/viewing shared network/i)).toBeVisible();
    
    // Controls still work
    const showLabelsCheckbox = page.getByRole('checkbox', { name: /show labels/i });
    await expect(showLabelsCheckbox).toBeChecked();
    
    await showLabelsCheckbox.uncheck();
    await expect(showLabelsCheckbox).not.toBeChecked();
  });
});
