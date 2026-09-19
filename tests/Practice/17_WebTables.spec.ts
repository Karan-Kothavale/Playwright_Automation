import { test, expect } from "@playwright/test";

test("Web Tables - Playwright Reference", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Locates the table.
    const table = page.getByRole("table").first();

    // Verifies that the table is visible.
    await expect(table).toBeVisible();

    // Gets all rows from the table.
    const rows = table.getByRole("row");

    // Gets the number of rows.
    const rowCount = await rows.count();

    console.log("Rows:", rowCount);

    // Challenge: Find a specific row using its text.
    const row = table.getByRole("row").filter({ hasText: "Karan" });

    // Verifies that the required row exists.
    await expect(row).toBeVisible();
});