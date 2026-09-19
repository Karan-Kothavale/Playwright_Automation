import { test, expect } from "@playwright/test";

test("Dropdowns - Playwright Reference", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Locates a native <select> dropdown.
    const dropdown = page.getByRole("combobox").first();

    // Selects an option using its visible text.
    await dropdown.selectOption({ label: "Option 2" });

    // Verifies that the expected option is selected.
    await expect(dropdown).toHaveValue("option2");

    // Note: selectOption() works only when the locator contains a <select> tag.
    // For a custom dropdown, click the dropdown and then select the option normally.
    await page.getByRole("button", { name: "Select Country" }).click();

    // Selects an option from the custom dropdown.
    await page.getByRole("option", { name: "India" }).click();
});