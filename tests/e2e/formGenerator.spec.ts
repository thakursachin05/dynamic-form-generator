import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import os from 'os';

test.describe('FormGenerator Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render form fields based on schema', async ({ page }) => {
    const fieldLabel = page.locator('label[for="name"]');
    await expect(fieldLabel).toHaveText('Full Name');

    const inputField = page.locator('input#name');
    await expect(inputField).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    const errorMessage = page.locator('span', { hasText: 'This field is required' });
    await expect(errorMessage).toBeVisible();
  });

  test('should submit form successfully', async ({ page }) => {
    const inputField = page.locator('input#name');
    await inputField.fill('John Doe');

    const submitButton = page.locator('button[type="submit"]');

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Form submitted successfully!');
      await dialog.accept();
    });

    await submitButton.click();
  });
  
  test('should download submission as JSON', async ({ page }) => {
    const inputField = page.locator('input#name');
    await inputField.fill('John Doe');
  
    const submitButton = page.locator('button[type="submit"]');
  
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
  
    await submitButton.click();
  
    const downloadButton = page.locator('button', { hasText: 'Download Submission' });
    await expect(downloadButton).toBeVisible();
  
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      downloadButton.click(),
    ]);
  
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, 'form-submission.json');
    await download.saveAs(filePath);
  
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
  
    expect(jsonData).toEqual({ name: 'John Doe' });
  });
  
});
