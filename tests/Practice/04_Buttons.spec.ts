import { test, expect } from "@playwright/test";

test("Buttons - Playwright Reference", async ({ page }) => {

    await page.goto("https://playwrightlab.github.io/index.html");

    // Locate button
    const registerButton = page.getByRole("button", { name: "Register" }); // getByRole() → Locates the button using role and accessible name.

    // toBeVisible() → Verifies that the button is visible.
    await expect(registerButton).toBeVisible();

    // toBeEnabled() → Verifies that the button is enabled.
    await expect(registerButton).toBeEnabled();

    // click() → Clicks the button.
    await registerButton.click();


    console.log("Button test completed successfully");
});