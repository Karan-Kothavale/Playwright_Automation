import { test, expect } from "@playwright/test";

test("Cookies and Local Storage - Playwright Reference", async ({ page, context }) => {
    await page.goto("https://playwrightlab.github.io/index.html");

    // Gets all cookies for the current browser context.
    const cookies = await context.cookies();

    // Prints the cookies.
    console.log("Cookies:", cookies);

    // Adds a cookie to the browser context.
    await context.addCookies([{
        name: "testCookie",
        value: "Karan",
        domain: "playwrightlab.github.io",
        path: "/"
    }]);

    // Verifies that the cookie was added.
    const updatedCookies = await context.cookies();
    expect(updatedCookies.some(cookie => cookie.name === "testCookie")).toBe(true);

    // Stores a value in local storage.
    await page.evaluate(() => {
        localStorage.setItem("username", "Karan");
    });

    // Reads the value from local storage.
    const username = await page.evaluate(() => localStorage.getItem("username"));

    // Verifies the local storage value.
    expect(username).toBe("Karan");

    // Challenge: Authentication tokens are often stored in cookies or local storage.
    // They can be preserved and reused through Playwright storageState.
});