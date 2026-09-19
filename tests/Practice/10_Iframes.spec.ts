import { test, expect } from "@playwright/test";

test("iFrames - Playwright Reference", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Locates the iframe and accesses its content.
    const frame = page.frameLocator("iframe").first();

    // Locates an element inside the iframe.
    const content = frame.locator("body");

    // Verifies that the iframe content is visible.
    await expect(content).toBeVisible();

    // Note: page.locator() cannot directly interact with elements inside an iframe.
    // We use frameLocator() to interact with elements inside an iframe.

    // Multiple Frames:
    const paymentFrame = page.frameLocator('iframe[name="paymentFrame"]');

    // Interacts with an element inside the required iframe.
    await paymentFrame.getByLabel("Card Number").fill("1234");
});