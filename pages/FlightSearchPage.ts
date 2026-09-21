import { expect, type Page } from '@playwright/test';

export class FlightSearchPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('/flight-booking-scenarios/');
        await expect(this.page.getByRole('heading', { name: 'Search Flights' })).toBeVisible();
    }

    async searchOneWayFlight(origin: string, destination: string, departureDate: string) {
        await this.page.locator('#flight-from').selectOption({ label: origin });
        await this.page.locator('#flight-to').selectOption({ label: destination });
        await this.page.locator('#flight-departure-date').fill(departureDate);
        await this.page.locator('#flight-one-way').check();
        await this.page.locator('button:has-text("Search Flights")').click();
    }
}