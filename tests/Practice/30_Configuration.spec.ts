import { test, expect } from "@playwright/test";

// Configuration is normally kept in playwright.config.ts.
// This test demonstrates values commonly controlled from the config.

test("Configuration - Playwright Reference", async ({ page }) => {
    // Opens the application.
    await page.goto("https://playwrightlab.github.io/index.html");

    // Locates the full-name input.
    const fullName = page.getByTestId("input-fullname");

    // Enters text.
    await fullName.fill("Karan");

    // Verifies the value.
    await expect(fullName).toHaveValue("Karan");
});

/*
COMMON playwright.config.ts SETTINGS:

use: {
    baseURL: "https://playwrightlab.github.io",
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry"
}

workers: 4
retries: 1
timeout: 30000

COMMANDS:

Run normally:
npx playwright test tests/30_Configuration.spec.ts

Run with a different number of workers:
npx playwright test tests/30_Configuration.spec.ts --workers=4

Run in headed mode:
npx playwright test tests/30_Configuration.spec.ts --headed

Run with a specific browser:
npx playwright test tests/30_Configuration.spec.ts --project=chromium
*/

/*
One-line:
Configuration means defining common test behavior such as browser,
timeouts, retries, workers, screenshots, videos and baseURL in one place.

Interview:
"I keep common Playwright settings in playwright.config.ts so I don't
repeat configuration across individual test files."
*/