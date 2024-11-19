import { test, expect } from '@playwright/test';

test.describe('JSONEditor Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display initial JSON in editor', async ({ page }) => {
    await page.goto('/');
  
    const expectedJson = `{
      "formTitle": "Sample Form",
      "formDescription": "Edit the JSON to see changes",
      "fields": [
        {
          "id": "name",
          "type": "text",
          "label": "Full Name",
          "required": true,
          "placeholder": "Enter your name"
        }
      ]
    }`;
  
    const editorValue = await page.evaluate(() => {
      const aceEditor = (window as any).ace.edit('json-editor');
      return aceEditor.getValue();
    });
  
    const expectedJsonObject = JSON.parse(expectedJson);
    const receivedJsonObject = JSON.parse(editorValue);
  
    expect(receivedJsonObject).toEqual(expectedJsonObject);
  });
  
  

  test('should show error for invalid JSON', async ({ page }) => {
    const editor = page.locator('.ace_text-input');

    // Enter invalid JSON
    await editor.focus();
    await editor.press('Control+A');
    await editor.press('Backspace');
    await editor.type('Invalid JSON');

    // Wait for error message
    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toHaveText(/Invalid JSON/);
  });

  test('should update form when valid JSON is entered', async ({ page }) => {
    const newJson = `{
      "formTitle": "Updated Form",
      "formDescription": "This is an updated form",
      "fields": [
        {
          "id": "email",
          "type": "email",
          "label": "Email Address",
          "required": true,
          "placeholder": "Enter your email"
        }
      ]
    }`;
  
    await page.evaluate((json) => {
      const editor = (window as any).ace.edit('json-editor');
      editor.setValue(json, -1);
    }, newJson);
  
    await page.waitForTimeout(500);
  
    const formTitle = page.locator('[data-testid="form-title"]');
    await expect(formTitle).toHaveText('Updated Form');
  
    const fieldLabel = page.locator('label[for="email"]');
    await expect(fieldLabel).toHaveText('Email Address');
  });
});
