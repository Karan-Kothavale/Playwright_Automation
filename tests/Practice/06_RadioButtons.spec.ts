import { test, expect } from "@playwright/test";

test("Radio Buttons - Playwright Reference", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Locates the radio button using its accessible role.
    const radio = page.getByRole("radio").first();

    // Selects the radio button.
    await radio.check();

    // Verifies that the radio button is selected.
    await expect(radio).toBeChecked();

    // Verifies that the radio button is enabled.
    await expect(radio).toBeEnabled();
});