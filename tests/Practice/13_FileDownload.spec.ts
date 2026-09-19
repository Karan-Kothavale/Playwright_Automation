import { test, expect } from "@playwright/test";

test("File Download - Playwright Reference", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Waits for the download event before clicking the download button.
    const downloadPromise = page.waitForEvent("download");

    // Triggers the file download.
    await page.getByRole("button", { name: "Download" }).click();

    // Gets the downloaded file.
    const download = await downloadPromise;

    // Gets the downloaded file name.
    const fileName = download.suggestedFilename();

    // Verifies that a file name was received.
    expect(fileName).toBeTruthy();

    // Challenge: Save the downloaded file to a specific location.
    await download.saveAs(`downloads/${fileName}`);

    console.log("Downloaded:", fileName);
});