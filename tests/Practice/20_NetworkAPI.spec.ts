import { test, expect } from "@playwright/test";

test("Network and API - Playwright Reference", async ({ page }) => {
    // Listens for an API response.
    const responsePromise = page.waitForResponse(
        response => response.url().includes("/api/") && response.status() === 200
    );

    // Opens the application page.
    await page.goto("https://playwrightlab.github.io/index.html");

    // Gets the API response.
    const response = await responsePromise;

    // Verifies that the API request was successful.
    expect(response.status()).toBe(200);

    // Gets the response body as JSON.
    const data = await response.json();

    console.log("API Response:", data);

    // Challenge: If the API is called by a specific UI action, start waitForResponse()
    // before performing that action so the response is captured.
});