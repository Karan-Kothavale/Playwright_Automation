import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

test("External Test Data - CSV Reference", async ({ page }) => {
    // Builds the absolute path to the CSV file.
    const filePath = path.resolve("test_data/user.csv");

    // Reads the CSV file.
    const csv = fs.readFileSync(filePath, "utf-8");

    // Converts CSV into JavaScript objects.
    const users = parse(csv, {
        columns: true,
        skip_empty_lines: true
    });

    for (const user of users) {
        // Opens the application.
        await page.goto("https://playwrightlab.github.io/index.html");

        // Locates the full-name input.
        const fullName = page.getByTestId("input-fullname");

        // Enters data from CSV.
        await fullName.fill(user.name);

        // Verifies the entered value.
        await expect(fullName).toHaveValue(user.name);
    }
});