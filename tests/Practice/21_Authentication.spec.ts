import { test, expect } from "@playwright/test";

test("Authentication - Playwright Reference", async ({ browser }) => {
    // Example 1: HTTP Basic Authentication using credentials.
    const basicAuthContext = await browser.newContext({
        httpCredentials: {
            username: "testuser",
            password: "testpassword"
        }
    });

    // Opens a page using HTTP authentication.
    const basicAuthPage = await basicAuthContext.newPage();
    await basicAuthPage.goto("https://example.com");

    // Example 2: Reuse an already authenticated session.
    const authenticatedContext = await browser.newContext({
        storageState: "auth.json"
    });

    // Opens a page using the saved authentication state.
    const page = await authenticatedContext.newPage();
    await page.goto("https://playwrightlab.github.io/index.html");

    // Verifies that the page loaded successfully.
    await expect(page).toHaveURL(/playwrightlab\.github\.io/);

    await basicAuthContext.close();
    await authenticatedContext.close();
});