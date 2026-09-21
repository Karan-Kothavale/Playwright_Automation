import { expect, Page } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyResultsDisplayed() {
        await expect(this.page.getByTestId('flight-result-GW100')).toBeVisible();
    }

    async selectFlight(flightNumber: string) {
        await this.page.getByTestId(`flight-select-${flightNumber}`).click();
        await this.page.getByTestId('flight-continue-to-passengers').click();
    }
}