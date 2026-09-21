import { type Page } from '@playwright/test';

export interface PassengerDetails {
    name: string;
    email: string;
    phone: string;
}

export interface PaymentDetails {
    cardNumber: string;
    expiry: string;
    cvv: string;
}

export class BookingPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async enterPassengerDetails(passenger: PassengerDetails) {
        await this.page.locator('#flight-passenger-name').fill(passenger.name);
        await this.page.locator('#flight-passenger-email').fill(passenger.email);
        await this.page.locator('#flight-passenger-phone').fill(passenger.phone);
        await this.page.locator('button:has-text("Continue to payment")').click();
    }

    async completePayment(payment: PaymentDetails) {
        await this.page.locator('#flight-card-number').fill(payment.cardNumber);
        await this.page.locator('#flight-expiry').fill(payment.expiry);
        await this.page.locator('#flight-cvv').fill(payment.cvv);
        await this.page.locator('button:has-text("Pay & Confirm Booking")').click();
    }
}