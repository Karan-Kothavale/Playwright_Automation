import { test, expect } from "@playwright/test";

// Uses Playwright's built-in page fixture.
test("Fixtures - Playwright Reference", async ({ page }) => {
    // Opens the application.
    await page.goto("https://playwrightlab.github.io/index.html");

    // Verifies that the page is available.
    await expect(page).toHaveURL(/index\.html/);
});

// Uses multiple built-in fixtures.
test("Multiple Fixtures", async ({ page, context }) => {
    // Gets cookies from the browser context.
    const cookies = await context.cookies();

    // Opens the application.
    await page.goto("https://playwrightlab.github.io/index.html");

    // Verifies that the page is available.
    await expect(page).toHaveURL(/index\.html/);
});