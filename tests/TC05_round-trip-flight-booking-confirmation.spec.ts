import { test, expect } from '@playwright/test';
import { BookingPage } from '../pages/BookingPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { FlightSearchPage } from '../pages/FlightSearchPage';

test.describe('Flight Booking Scenarios', () => {
  test('TC05 - should complete a valid round-trip booking and display confirmation', async ({ page }) => {
    const flightSearchPage = new FlightSearchPage(page);
    const bookingPage = new BookingPage(page);
    const confirmationPage = new ConfirmationPage(page);

    // 1. Start from a fresh browser page and open the Flight Booking practice page through the existing FlightSearchPage entry point.
    await flightSearchPage.open();
    await expect(page.getByRole('heading', { name: 'Search Flights' })).toBeVisible();

    // 2. Search a round trip from New York to London with departure date 2027-08-01 and return date 2027-08-10, using one passenger and Economy class.
    await page.getByTestId('flight-from').selectOption('New York');
    await page.getByTestId('flight-to').selectOption('London');
    await page.getByTestId('flight-departure-date').fill('2027-08-01');
    await page.getByTestId('flight-return-date').fill('2027-08-10');
    await page.getByTestId('flight-search').click();
    await expect(page.getByRole('heading', { name: 'Choose your flights' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Departure · New York → London' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Return · London → New York' })).toBeVisible();

    // 3. Select Global Wings GW100 for departure and Global Wings GW200 for return, then continue to passenger details.
    await page.getByTestId('flight-select-GW100').click();
    await page.getByTestId('flight-select-GW200').click();
    await page.getByTestId('flight-continue-to-passengers').click();
    await expect(page.getByRole('heading', { name: 'Passenger details' })).toBeVisible();

    // 4. Enter passenger details: full name Ada Lovelace, email ada@example.com, and phone +15550100; then continue to payment.
    await bookingPage.enterPassengerDetails({ name: 'Ada Lovelace', email: 'ada@example.com', phone: '+15550100' });
    await expect(page.getByRole('heading', { name: 'Payment' })).toBeVisible();
    await expect(page.getByText('Global Wings (GW100)')).toBeVisible();
    await expect(page.getByText('Global Wings (GW200)')).toBeVisible();
    await expect(page.getByText('× 1 passenger · Economy')).toBeVisible();
    await expect(page.getByText('$420')).toBeVisible();

    // 5. Enter card number 4111111111111111, expiry 12/30, and CVV 123, then click Pay & Confirm Booking.
    await bookingPage.completePayment({ cardNumber: '4111111111111111', expiry: '12/30', cvv: '123' });
    await expect(page.getByText('✓ Payment')).toBeVisible();
    await confirmationPage.verifyBookingConfirmed();
  });
});