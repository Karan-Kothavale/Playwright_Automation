import { test, expect } from "@playwright/test";

test("File Upload - Playwright Reference", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Locates the native file input.
    const fileInput = page.locator('input[type="file"]').first();

    // Uploads a file directly.
    await fileInput.setInputFiles("test-data/sample.txt");

    // Verifies that the file was selected.
    await expect(fileInput).toHaveValue(/sample\.txt/);

    // Challenge: If there is no <input type="file"> in the locator, handle the file chooser.
    const fileChooserPromise = page.waitForEvent("filechooser");

    // Clicks the custom upload button.
    await page.getByRole("button", { name: "Upload" }).click();

    // Gets the file chooser opened by the button.
    const fileChooser = await fileChooserPromise;

    // Selects the file through the file chooser.
    await fileChooser.setFiles("test-data/sample.txt");
});