import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/playwright',
  timeout: 30 * 1000, 
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
});
