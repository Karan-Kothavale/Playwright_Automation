import { test, expect } from "@playwright/test";

test("Waits - Playwright Reference", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Playwright automatically waits for elements to be ready before actions.
    const input = page.getByTestId("input-fullname");
    await input.fill("Karan");

    // Waits until the element reaches the expected state.
    await expect(input).toBeVisible();

    // Challenge: When you need to wait for a specific condition, use waitFor().
    await input.waitFor({ state: "visible" });

    // Waits for a fixed amount of time only when really required.
    await page.waitForTimeout(1000);
});