import { test, expect } from "@playwright/test";

test("Keyboard Actions - Playwright Reference", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Locates the input field.
    const input = page.getByTestId("input-fullname");

    // Types text into the input.
    await input.fill("Karan");

    // Presses a keyboard key.
    await input.press("End");

    // Selects all text using the keyboard.
    await input.press("Control+A");

    // Types text sequentially like real keyboard input.
    await input.pressSequentially("Playwright");

    // Challenge: Press a key combination such as Control+C.
    await input.press("Control+C");

    // Presses Enter.
    await input.press("Enter");
});