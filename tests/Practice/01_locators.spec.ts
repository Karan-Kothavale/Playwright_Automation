import { test, expect } from "@playwright/test";

test("Playwright Locators Practice", async ({ page }) => {

    await page.goto("https://playwrightlab.github.io/index.html");

    // 1. getByRole()
    await page.getByRole("button", { name: "Register" }).click();

    // 2. getByText()
    await expect(
        page.getByText("PlayLab is a comprehensive test automation practice website")
    ).toBeVisible();

    // 3. getByLabel()
    await page.getByLabel("Email Address").fill("test@gmail.com");

    // 4. getByPlaceholder()
    await page.getByPlaceholder("John Doe").first().fill("Karan");

    // 5. getByTestId()
    await page.getByTestId("input-fullname").fill("Karan");
});