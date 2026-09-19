import { test, expect } from "@playwright/test";

test("Page Navigation - Playwright Reference", async ({ page }) => {
    // Opens the application URL.
    await page.goto("https://playwrightlab.github.io/index.html");

    // Navigates to another URL.
    await page.goto("https://playwrightlab.github.io/");

    // Goes back to the previous page.
    await page.goBack();

    // Verifies the current URL.
    await expect(page).toHaveURL(/index\.html/);

    // Goes forward to the next page.
    await page.goForward();

    // Reloads the current page.
    await page.reload();

    // Challenge: Wait for a specific page to finish loading before continuing.
    await page.waitForLoadState("domcontentloaded");
});