import { test } from '@playwright/test';
import { BookingPage } from '../pages/BookingPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { FlightSearchPage } from '../pages/FlightSearchPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test('TC01 - should successfully complete a one-way flight booking', async ({ page }) => {
    const flightSearchPage = new FlightSearchPage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const bookingPage = new BookingPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await flightSearchPage.open();
    await flightSearchPage.searchOneWayFlight('New York', 'London', '2027-08-01');
    await searchResultsPage.verifyResultsDisplayed();
    await searchResultsPage.selectFlight('GW100');
    await bookingPage.enterPassengerDetails({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        phone: '+15550100',
    });
    await bookingPage.completePayment({
        cardNumber: '4111111111111111',
        expiry: '12/30',
        cvv: '123',
    });
    await confirmationPage.verifyBookingConfirmed();
});