import { test, expect } from "@playwright/test";

// These tests can run independently and therefore can run in parallel.
test.describe.configure({ mode: "parallel" });

test.describe("Parallel Execution", () => {

    test("Test 1 - Input", async ({ page }) => {
        // Opens the application.
        await page.goto("https://playwrightlab.github.io/index.html");

        // Locates the full-name input.
        const fullName = page.getByTestId("input-fullname");

        // Enters text.
        await fullName.fill("Karan");

        // Verifies the value.
        await expect(fullName).toHaveValue("Karan");
    });

    test("Test 2 - Logo", async ({ page }) => {
        // Opens the application.
        await page.goto("https://playwrightlab.github.io/index.html");

        // Locates the logo.
        const logo = page.getByTestId("logo");

        // Verifies the logo is visible.
        await expect(logo).toBeVisible();
    });
});