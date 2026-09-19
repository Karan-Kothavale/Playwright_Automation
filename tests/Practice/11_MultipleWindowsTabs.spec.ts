import { test, expect } from "@playwright/test";

test("Multiple Windows and Tabs - Playwright Reference", async ({ page, context }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Waits for a new tab/window while clicking the link that opens it.
    const newPagePromise = context.waitForEvent("page");

    // Opens the new tab/window.
    await page.getByRole("link", { name: "Open New Window" }).click();

    // Gets the newly opened page.
    const newPage = await newPagePromise;

    // Waits until the new page is loaded.
    await newPage.waitForLoadState();

    // Verifies that the new page is available.
    await expect(newPage).toHaveURL(/.+/);

    // Note: Do not use page.locator() for elements in the new tab.
    // Use the newPage object to interact with the new tab.
});