import { expect, Page } from '@playwright/test';

export class ConfirmationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyBookingConfirmed() {
        await expect(this.page.getByTestId('flight-booking-success')).toContainText('Booking Confirmed');
        await expect(this.page.getByTestId('flight-pnr')).toBeVisible();
        await expect(this.page.getByTestId('flight-pnr')).not.toHaveText('');
    }
}