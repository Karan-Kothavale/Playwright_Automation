import { test, expect } from '@playwright/test';
import { FlightSearchPage } from '../pages/FlightSearchPage';

test.describe('Flight Booking Scenarios', () => {
  test('TC04 - should search, filter, and select flights for a valid round trip', async ({ page }) => {
    const flightSearchPage = new FlightSearchPage(page);

    // 1. Start from a fresh browser page and open the Flight Booking practice page through the existing FlightSearchPage entry point.
    await flightSearchPage.open();
    await expect(page.getByRole('heading', { name: 'Search Flights' })).toBeVisible();
    await expect(page.getByTestId('flight-from')).toHaveValue('');
    await expect(page.getByTestId('flight-to')).toHaveValue('');

    // 2. Select New York as the departure city, London as the destination city, enter a future departure date of 2027-08-01 and return date of 2027-08-10, leave One Way unchecked, and submit Search Flights.
    await page.getByTestId('flight-from').selectOption('New York');
    await page.getByTestId('flight-to').selectOption('London');
    await page.getByTestId('flight-departure-date').fill('2027-08-01');
    await page.getByTestId('flight-return-date').fill('2027-08-10');
    await page.getByTestId('flight-search').click();
    await expect(page.getByRole('heading', { name: 'Choose your flights' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Departure · New York → London' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Return · London → New York' })).toBeVisible();
    await expect(page.getByTestId('flight-continue-to-passengers')).toBeDisabled();

    // 3. Change Sort by to Duration: Shortest and enable Non-stop only.
    await page.getByTestId('flight-sort').selectOption('Duration: Shortest');
    await page.getByTestId('flight-filter-nonstop').check();
    await expect(page.getByTestId('flight-sort')).toHaveValue('duration');
    await expect(page.getByTestId('flight-filter-nonstop')).toBeChecked();
    await expect(page.getByRole('heading', { name: 'Choose your flights' })).toBeVisible();

    // 4. Select the Global Wings GW100 departure and Global Wings GW200 return options.
    await page.getByTestId('flight-select-GW100').click();
    await page.getByTestId('flight-select-GW200').click();
    await expect(page.getByTestId('flight-select-GW100')).toHaveText('Selected ✓');
    await expect(page.getByTestId('flight-select-GW200')).toHaveText('Selected ✓');
    await expect(page.getByTestId('flight-continue-to-passengers')).toBeEnabled();

    // 5. Click Continue to passenger details.
    await page.getByTestId('flight-continue-to-passengers').click();
    await expect(page.getByRole('heading', { name: 'Passenger details' })).toBeVisible();
    await expect(page.getByTestId('flight-passenger-name')).toBeVisible();
    await expect(page.getByTestId('flight-passenger-email')).toBeVisible();
    await expect(page.getByTestId('flight-passenger-phone')).toBeVisible();
    await expect(page.getByTestId('flight-continue-to-payment')).toBeVisible();
  });
});