import { test } from '@playwright/test';
import { FlightSearchPage } from '../pages/FlightSearchPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test('TC02 - should display valid flight search results for a one-way journey', async ({ page }) => {
    const departureDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const flightSearchPage = new FlightSearchPage(page);
    const searchResultsPage = new SearchResultsPage(page);

    await flightSearchPage.open();
    await flightSearchPage.searchOneWayFlight('New York', 'London', departureDate);

    await searchResultsPage.verifyResultsDisplayed();
    await searchResultsPage.verifyRoute('New York', 'London');
});
