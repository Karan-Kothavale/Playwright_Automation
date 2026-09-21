import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test configuration
 */
export default defineConfig({
  testDir: './tests',

  // Run independent test files in parallel.
  fullyParallel: true,

  // Prevent accidental test.only usage in CI.
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI.
  retries: process.env.CI ? 2 : 0,

  // Use a single worker in CI for stability.
  workers: process.env.CI ? 1 : undefined,

  // Generate HTML execution report.
  reporter: 'html',

  use: {
    // Application domain is controlled from configuration.
    // Can be overridden using BASE_URL environment variable.
    baseURL: process.env.BASE_URL || 'https://www.qapractice.com',

    // Collect trace when a test is retried.
    trace: 'on-first-retry',

    // Keep browser visible during local execution.
    headless: false,

    // Capture screenshot for failed tests.
    screenshot: 'only-on-failure',

    // Retain video only when a test fails.
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Enable when required.
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});