import { test, expect } from '@playwright/test';

test.describe('Responsive Layout', () => {
  test('displays correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone dimensions
    await page.goto('http://localhost:3000');
    
    const form = await page.locator('form');
    await expect(form).toBeVisible();
  });

  test('displays correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('http://localhost:3000');
    
    const form = await page.locator('form');
    await expect(form).toBeVisible();
  });
});
