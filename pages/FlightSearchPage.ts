import { expect, Page } from '@playwright/test';

export class FlightSearchPage {
    readonly page: Page;
    readonly searchResults;

    constructor(page: Page) {
        this.page = page;
        this.searchResults = page.getByTestId('flight-search');
    }

    async open() {
        await this.page.goto('/flight-booking-scenarios/');
        await expect(this.page.getByRole('heading', { name: 'Search Flights' })).toBeVisible();
    }

    async searchOneWayFlight(origin: string, destination: string, departureDate: string) {
        await this.page.getByTestId('flight-from').selectOption({ label: origin });
        await this.page.getByTestId('flight-to').selectOption({ label: destination });
        await this.page.getByTestId('flight-departure-date').fill(departureDate);
        await this.page.getByTestId('flight-one-way').check();
        await this.searchResults.click();
    }
}