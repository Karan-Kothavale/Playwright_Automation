import { test, expect } from "@playwright/test";

// Reusable utility function for generating test data.
function generateName(prefix: string): string {
    return `${prefix}_${Date.now()}`;
}

// Reusable utility function for waiting for a condition.
async function waitForInputValue(page: any, value: string) {
    await expect(page.getByTestId("input-fullname")).toHaveValue(value);
}

test("Utilities - Playwright Reference", async ({ page }) => {
    // Opens the application.
    await page.goto("https://playwrightlab.github.io/index.html");

    // Generates unique test data.
    const name = generateName("Karan");

    // Locates the input field.
    const fullName = page.getByTestId("input-fullname");

    // Enters the generated test data.
    await fullName.fill(name);

    // Uses the reusable utility function.
    await waitForInputValue(page, name);
});