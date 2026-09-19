import { test, expect } from "@playwright/test";

test("Shadow DOM - Playwright Reference", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Playwright locators can automatically pierce open Shadow DOM.
    const shadowElement = page.getByText("Shadow DOM");

    // Verifies the Shadow DOM element is visible.
    await expect(shadowElement).toBeVisible();

    // Challenge: XPath does not pierce Shadow DOM.
    // Prefer Playwright locators or CSS when working with Shadow DOM.
});