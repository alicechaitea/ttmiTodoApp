import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,  // Run tests in headless mode by default
  },
  testDir: 'tests',  // Directory where your test files are located
});
