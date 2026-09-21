import { expect, type Page } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyResultsDisplayed() {
        await expect(this.page.getByText('Choose your flights')).toBeVisible({ timeout: 15000 });
        await expect(this.page.locator('body')).toContainText(/Global Wings \(GW100\)|Sky High Airlines|Air Swift/i, { timeout: 15000 });
    }

    async verifyRoute(origin: string, destination: string) {
        await expect(this.page.locator('body')).toContainText(`Departure · ${origin} → ${destination}`, { timeout: 15000 });
    }

    async selectFlight(flightNumber: string) {
        const flightText = this.page.locator('body').getByText(new RegExp(`${flightNumber}`, 'i')).first();
        await expect(flightText).toBeVisible({ timeout: 15000 });
        const selectButton = this.page.getByRole('button', { name: /^Select$/ }).nth(3);
        await expect(selectButton).toBeVisible({ timeout: 15000 });
        await selectButton.click();
        await this.page.locator('button:has-text("Continue to passenger details")').click();
    }
}