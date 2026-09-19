import { test, expect } from "@playwright/test";

test("Reports - Playwright Reference", async ({ page }) => {
    // Opens the application.
    await page.goto("https://playwrightlab.github.io/index.html");

    // Locates the full-name input.
    const fullName = page.getByTestId("input-fullname");

    // Enters test data.
    await fullName.fill("Karan");

    // Verifies the result.
    await expect(fullName).toHaveValue("Karan");

    // Useful commands:
    // npx playwright test --reporter=html
    // npx playwright show-report
    // npx playwright test --reporter=list
    // npx playwright test --reporter=line
});