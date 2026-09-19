import { test, expect } from "@playwright/test";

test("Input Fields - Playwright Reference", async ({ page }) => {

    await page.goto("https://playwrightlab.github.io/index.html");


    // =====================================================
    // 1. LOCATE INPUT
    // =====================================================

    const fullName = page.getByTestId("input-fullname");
    // getByTestId() → Locates the input using data-testid.


    // =====================================================
    // 2. FILL
    // =====================================================

    await fullName.fill("Karan Kothavale");
    // fill() → Clears the existing value and enters the given text.


    // =====================================================
    // 3. VERIFY VALUE
    // =====================================================

    await expect(fullName).toHaveValue("Karan Kothavale");
    // toHaveValue() → Verifies the current value of an input.


    // =====================================================
    // 4. CLEAR
    // =====================================================

    await fullName.clear();
    // clear() → Removes the existing text from the input.


    // =====================================================
    // 5. TYPE
    // =====================================================

    await fullName.pressSequentially("Karan");
    // pressSequentially() → Types characters one by one like keyboard input.


    // =====================================================
    // 6. PRESS KEY
    // =====================================================

    await fullName.press("End");
    // press() → Presses a keyboard key on the input.


    // =====================================================
    // 7. SELECT ALL + REPLACE
    // =====================================================

    await fullName.press("Control+A");
    // press("Control+A") → Selects all text in the input.

    await fullName.pressSequentially("Playwright");
    // Types new text over the selected text.


    // =====================================================
    // 8. INPUT VALUE
    // =====================================================

    const value = await fullName.inputValue();
    // inputValue() → Gets the current value from the input.

    console.log("Input value:", value);


    // =====================================================
    // 9. VERIFY INPUT IS ENABLED
    // =====================================================

    await expect(fullName).toBeEnabled();
    // toBeEnabled() → Verifies that the input is enabled.


    // =====================================================
    // 10. VERIFY INPUT IS VISIBLE
    // =====================================================

    await expect(fullName).toBeVisible();
    // toBeVisible() → Verifies that the input is visible.


    // =====================================================
    // 11. FOCUS
    // =====================================================

    await fullName.focus();
    // focus() → Moves keyboard focus to the input.


    // =====================================================
    // 12. BLUR
    // =====================================================

    await fullName.blur();
    // blur() → Removes focus from the input.


    console.log("Input field operations completed");
});