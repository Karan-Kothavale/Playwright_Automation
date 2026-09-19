import { test, expect, Page } from "@playwright/test";

// Page Object contains locators and actions for the page.
class PlayLabPage {
    readonly page: Page;
    readonly fullName = this.page.getByTestId("input-fullname");
    readonly logo = this.page.getByTestId("logo");

    constructor(page: Page) {
        this.page = page;
    }

    // Opens the application.
    async open() {
        await this.page.goto("https://playwrightlab.github.io/index.html");
    }

    // Enters a name into the input field.
    async enterName(name: string) {
        await this.fullName.fill(name);
    }
}

test("Page Object Model - Playwright Reference", async ({ page }) => {
    // Creates the Page Object.
    const playLab = new PlayLabPage(page);

    // Opens the application.
    await playLab.open();

    // Performs the page action through the Page Object.
    await playLab.enterName("Karan");

    // Verifies the result.
    await expect(playLab.fullName).toHaveValue("Karan");

    // Verifies the logo.
    await expect(playLab.logo).toBeVisible();
});