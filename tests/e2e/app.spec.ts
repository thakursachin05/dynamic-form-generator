import { test, expect } from '@playwright/test';

test.describe('App Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should toggle dark mode', async ({ page }) => {
    const toggleButton = page.locator('button', { hasText: /Toggle (Light|Dark) Mode/ });
    const htmlElement = page.locator('html');
  
    const initialClass = (await htmlElement.getAttribute('class')) || '';
    const initialDarkMode = initialClass.includes('dark');
  
    // Toggle dark mode
    await toggleButton.click();
    const toggledClass = (await htmlElement.getAttribute('class')) || '';
    const toggledDarkMode = toggledClass.includes('dark');
  
    expect(toggledDarkMode).toBe(!initialDarkMode);
  
    // Toggle back
    await toggleButton.click();
    const finalClass = (await htmlElement.getAttribute('class')) || '';
    const finalDarkMode = finalClass.includes('dark');
  
    expect(finalDarkMode).toBe(initialDarkMode);
  });
  

  test('should copy form JSON to clipboard', async ({ browserName, browser }) => {
    test.skip(browserName === 'firefox', 'Clipboard API is not supported in Firefox in headless mode.');
  
    const contextWithPermissions = await browser.newContext({
      permissions: ['clipboard-read', 'clipboard-write'],
    });
  
    const page = await contextWithPermissions.newPage();
    await page.goto('/');
  
    const copyButton = page.locator('button', { hasText: 'Copy Form JSON' });
  
    await page.evaluate(() => navigator.clipboard.writeText(''));
  
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Form JSON copied to clipboard!');
      await dialog.accept();
    });
  
    await copyButton.click();
  
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  
    const expectedJson = JSON.stringify(
      {
        formTitle: 'Sample Form',
        formDescription: 'Edit the JSON to see changes',
        fields: [
          {
            id: 'name',
            type: 'text',
            label: 'Full Name',
            required: true,
            placeholder: 'Enter your name',
          },
        ],
      },
      null,
      2
    );
  
    expect(clipboardText.trim()).toBe(expectedJson.trim());
  
    await contextWithPermissions.close();
  });
});
