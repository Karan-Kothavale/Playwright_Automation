import { test, expect } from "@playwright/test";

// Test data used to run the same test with different values.
const testData = [
    { name: "Karan" },
    { name: "Playwright" },
    { name: "Automation" }
];

// Runs the same test separately for each data set.
for (const data of testData) {
    test(`Parameterized Test - ${data.name}`, async ({ page }) => {
        // Opens the application.
        await page.goto("https://playwrightlab.github.io/index.html");

        // Locates the input field.
        const fullName = page.getByTestId("input-fullname");

        // Enters the current test data.
        await fullName.fill(data.name);

        // Verifies that the correct value was entered.
        await expect(fullName).toHaveValue(data.name);
    });
}