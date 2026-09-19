import { test, expect } from "@playwright/test";

test("CI CD - Playwright Reference", async ({ page }) => {
    // Opens the application.
    await page.goto("https://playwrightlab.github.io/index.html");

    // Locates the full-name input.
    const fullName = page.getByTestId("input-fullname");

    // Enters test data.
    await fullName.fill("Karan");

    // Verifies the result.
    await expect(fullName).toHaveValue("Karan");

    // CI commands:
    // npx playwright test
    // npx playwright test --workers=4
    // npx playwright test --reporter=html
});