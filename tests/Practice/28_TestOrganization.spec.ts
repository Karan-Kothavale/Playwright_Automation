import { test, expect } from "@playwright/test";

// Groups related tests into one logical suite.
test.describe("PlayLab - Input Tests", () => {

    // Runs before every test in this group.
    test.beforeEach(async ({ page }) => {
        // Opens the application before each test.
        await page.goto("https://playwrightlab.github.io/index.html");
    });

    // Test for entering a valid name.
    test("Enter name", async ({ page }) => {
        // Locates the full-name input.
        const fullName = page.getByTestId("input-fullname");

        // Enters the name.
        await fullName.fill("Karan");

        // Verifies the entered value.
        await expect(fullName).toHaveValue("Karan");
    });

    // Test for clearing the input.
    test("Clear name", async ({ page }) => {
        // Locates the full-name input.
        const fullName = page.getByTestId("input-fullname");

        // Enters text.
        await fullName.fill("Playwright");

        // Clears the input.
        await fullName.clear();

        // Verifies that the input is empty.
        await expect(fullName).toHaveValue("");
    });
});