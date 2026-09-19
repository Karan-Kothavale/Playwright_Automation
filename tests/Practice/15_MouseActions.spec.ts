import { test } from "@playwright/test";

test("Mouse Actions - Playwright Reference", async ({ page }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Locates an element to perform mouse actions on.
    const logo = page.getByTestId("logo");

    // Clicks the element.
    await logo.click();

    // Double-clicks the element.
    await logo.dblclick();

    // Right-clicks the element.
    await logo.click({ button: "right" });

    // Moves the mouse over the element.
    await logo.hover();

    // Challenge: Perform a mouse action at a specific screen position.
    await page.mouse.move(500, 300);

    // Clicks at the specified screen position.
    await page.mouse.click(500, 300);
});