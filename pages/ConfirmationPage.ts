import { expect, type Page } from '@playwright/test';

export class ConfirmationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyBookingConfirmed() {
        await expect(this.page.getByRole('heading', { name: 'Booking Confirmed!' })).toBeVisible({ timeout: 15000 });
        await expect(this.page.locator('body')).toContainText(/Booking reference [A-Z0-9]+|booking reference/i, { timeout: 15000 });
    }
}