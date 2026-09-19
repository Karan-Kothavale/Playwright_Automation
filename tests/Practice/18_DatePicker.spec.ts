import { test, expect } from "@playwright/test";

test("Date Picker - Playwright Reference", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Locates a date input.
    const dateInput = page.locator('input[type="date"]').first();

    // Selects a date directly in a native date input.
    await dateInput.fill("2026-09-20");

    // Verifies the selected date.
    await expect(dateInput).toHaveValue("2026-09-20");

    // Challenge: A custom date picker may not use <input type="date">.
    // In that case, open the date picker and select the date through its UI.
});