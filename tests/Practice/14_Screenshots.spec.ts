import { test } from "@playwright/test";

test("Screenshots - Playwright Reference", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Takes a screenshot of the entire visible page.
    await page.screenshot({ path: "screenshots/page.png" });

    // Takes a screenshot of a specific element.
    const logo = page.getByTestId("logo");
    await logo.screenshot({ path: "screenshots/logo.png" });

    // Challenge: Capture the complete page including content below the viewport.
    await page.screenshot({
        path: "screenshots/full-page.png",
        fullPage: true
    });
});