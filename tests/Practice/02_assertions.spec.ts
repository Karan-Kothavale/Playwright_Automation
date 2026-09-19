import { test, expect } from "@playwright/test";

test("Playwright Assertions Practice", async ({ page }) => {

    // Open website
    await page.goto("https://playwrightlab.github.io/index.html");


    // =====================================================
    // 1. HARD + AUTO-RETRYING
    // Verify Full Name field is visible
    // =====================================================

    await expect(
        page.getByTestId("input-fullname")
    ).toBeVisible();


    // =====================================================
    // 2. ACTION
    // =====================================================

    await page.getByTestId("input-fullname").fill("Karan");


    // =====================================================
    // 3. HARD + AUTO-RETRYING
    // Verify value
    // =====================================================

    await expect(
        page.getByTestId("input-fullname")
    ).toHaveValue("Karan");


    // =====================================================
    // 4. HARD + NON-RETRYING
    // =====================================================

    const name =
        await page.getByTestId("input-fullname").inputValue();

    expect(name).toBe("Karan");


    // =====================================================
    // 5. SOFT + AUTO-RETRYING
    // =====================================================

    await expect.soft(
        page.getByTestId("input-fullname")
    ).toHaveValue("Karan");


    // =====================================================
    // 6. SOFT + NON-RETRYING
    // =====================================================

    const currentName =
        await page.getByTestId("input-fullname").inputValue();

    expect.soft(currentName).toBe("Karan");


    // =====================================================
    // 7. HARD + AUTO-RETRYING
    // =====================================================

    await expect(
        page.getByTestId("logo")
    ).toBeVisible();


    console.log("All assertions completed");
});