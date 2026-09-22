import { test, expect } from '@playwright/test';
import { FlightSearchPage } from '../pages/FlightSearchPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test.describe('Flight Booking Scenarios', () => {
  test('TC03 - should display required-field validation when flight search criteria are missing', async ({ page }) => {
    const flightSearchPage = new FlightSearchPage(page);
    const searchResultsPage = new SearchResultsPage(page);

    // 1. Start from a fresh browser page and open the Flight Booking practice page through the existing FlightSearchPage entry point.
    await flightSearchPage.open();
    await expect(page.getByRole('heading', { name: 'Flight Booking Automation Practice' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Search Flights' })).toBeVisible();
    await expect(page.getByTestId('flight-from')).toHaveValue('');
    await expect(page.getByTestId('flight-to')).toHaveValue('');
    await expect(page.getByTestId('flight-departure-date')).toHaveValue('');
    await expect(page.getByTestId('flight-return-date')).toHaveValue('');
    await expect(page.getByTestId('flight-passengers')).toHaveValue('1');
    await expect(page.getByTestId('flight-class')).toHaveValue('Economy');
    await expect(page.getByTestId('flight-one-way')).not.toBeChecked();

    // 2. Without selecting cities or entering dates, click Search Flights.
    await page.getByTestId('flight-search').click();
    await expect(page.getByRole('heading', { name: 'Search Flights' })).toBeVisible();
    await expect(page.getByText('Please select a departure city.')).toBeVisible();
    await expect(page.getByText('Please select a destination city.')).toBeVisible();
    await expect(page.getByText('Please select a departure date.')).toBeVisible();
    await expect(page.getByText('Please select a return date.')).toBeVisible();

    // 3. Select New York as From, London as To, enter a valid future departure date, enable One Way, and click Search Flights.
    await flightSearchPage.searchOneWayFlight('New York', 'London', '2027-08-01');
    await searchResultsPage.verifyResultsDisplayed();
    await expect(page.getByText('Please select a return date.')).not.toBeVisible();
  });
});