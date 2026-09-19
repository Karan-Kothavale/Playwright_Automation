import { test, expect } from "@playwright/test";

test.describe("Test Hooks - Playwright Reference", () => {

    // Runs once before all tests.
    test.beforeAll(async () => {
        console.log("Before all tests");
    });

    // Runs before every test.
    test.beforeEach(async ({ page }) => {
        await page.goto("https://playwrightlab.github.io/index.html");
    });

    test("Test 1", async ({ page }) => {
        // Verifies that the page loaded.
        await expect(page).toHaveURL(/index\.html/);
    });

    test("Test 2", async ({ page }) => {
        // Verifies that the page loaded.
        await expect(page).toHaveTitle(/PlayLab/i);
    });

    // Runs after every test.
    test.afterEach(async () => {
        console.log("Test completed");
    });

    // Runs once after all tests.
    test.afterAll(async () => {
        console.log("All tests completed");
    });
});