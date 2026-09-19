import { test, expect } from "@playwright/test";

test("Checkboxes - Playwright Reference", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    const checkbox = page.getByRole("checkbox").first();
    // getByRole() → Locates the checkbox using its accessible role.

    await checkbox.check();
    // check() → Selects the checkbox.

    await expect(checkbox).toBeChecked();
    // toBeChecked() → Verifies that the checkbox is selected.

    await checkbox.uncheck();
    // uncheck() → Deselects the checkbox.

    await expect(checkbox).not.toBeChecked();
    // not.toBeChecked() → Verifies that the checkbox is not selected.
});