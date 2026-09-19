import { test, expect } from "@playwright/test";

test("Alerts and Dialogs - Playwright Reference", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Browser alert: Playwright automatically dismisses it by default.
    await page.getByRole("button", { name: "Alert" }).click();

    // Challenge: If we want to explicitly accept, dismiss, or enter a value, handle the dialog.
    page.on("dialog", async dialog => {
        // Prints the dialog message.
        console.log(dialog.message());

        // Accepts the dialog.
        await dialog.accept();
    });

    
});