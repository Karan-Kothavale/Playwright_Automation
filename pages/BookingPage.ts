import { Page } from '@playwright/test';

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
        await this.page.getByTestId('flight-passenger-name').fill(passenger.name);
        await this.page.getByTestId('flight-passenger-email').fill(passenger.email);
        await this.page.getByTestId('flight-passenger-phone').fill(passenger.phone);
        await this.page.getByTestId('flight-continue-to-payment').click();
    }

    async completePayment(payment: PaymentDetails) {
        await this.page.getByTestId('flight-card-number').fill(payment.cardNumber);
        await this.page.getByTestId('flight-expiry').fill(payment.expiry);
        await this.page.getByTestId('flight-cvv').fill(payment.cvv);
        await this.page.getByTestId('flight-book').click();
    }
}