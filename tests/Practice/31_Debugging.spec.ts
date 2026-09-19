import { test, expect } from "@playwright/test";

test("Debugging - Playwright Reference", async ({ page }) => {
    // Opens the application.
    await page.goto("https://playwrightlab.github.io/index.html");

    // Locates the full-name input.
    const fullName = page.getByTestId("input-fullname");

    // Enters test data.
    await fullName.fill("Karan");

    // Pauses execution so we can inspect the page manually.
    await page.pause();

    // Verifies the entered value.
    await expect(fullName).toHaveValue("Karan");

    // Prints the current URL in the terminal.
    console.log("Current URL:", page.url());
});

/*
DEBUG COMMANDS:

Run this test in Playwright Inspector:
npx playwright test tests/31_Debugging.spec.ts --debug

Run with browser visible:
npx playwright test tests/31_Debugging.spec.ts --headed

Run with VS Code:
Set a breakpoint -> Right click test -> Debug Test

Useful debugging methods:

await page.pause();
console.log(await fullName.inputValue());
console.log(page.url());

*/