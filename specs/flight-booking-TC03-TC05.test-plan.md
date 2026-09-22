# Flight Booking Test Plan TC03-TC05

## Application Overview

QA Practice Flight Booking Automation page at the configured base URL. The application is a multi-step flight booking wizard: search flight criteria, select departure and optional return flights, enter passenger details, complete payment, and verify a booking confirmation. Each scenario starts from a fresh blank page state and should use the existing Page Object architecture, with route and locators owned by page objects and business flow expressed in the TC spec.

## Test Scenarios

### 1. Flight Booking Scenarios

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC03 - should display required-field validation when flight search criteria are missing

**File:** `tests/TC03_required-flight-search-validation.spec.ts`

**Steps:**
  1. Start from a fresh browser page and open the Flight Booking practice page through the existing FlightSearchPage entry point.
    - expect: The Flight Booking Automation Practice page is displayed.
    - expect: The Search Flights section is visible with From, To, Departure Date, Return Date, Passengers, Travel Class, and One Way controls.
    - expect: From and To show Select City, date fields are empty, passenger count is 1, and Economy is selected.
  2. Without selecting cities or entering dates, click Search Flights.
    - expect: The application remains on the Search Flights step and does not display flight results.
    - expect: Inline validation appears for From: Please select a departure city.
    - expect: Inline validation appears for To: Please select a destination city.
    - expect: Inline validation appears for Departure Date: Please select a departure date.
    - expect: Inline validation appears for Return Date: Please select a return date.
  3. Select New York as From, London as To, enter a valid future departure date, enable One Way, and click Search Flights.
    - expect: The application advances to flight results for the one-way journey.
    - expect: The return-date validation is cleared or no longer blocks submission.
    - expect: No stale required-field validation prevents the valid search.

#### 1.2. TC04 - should search, filter, and select flights for a valid round trip

**File:** `tests/TC04_round-trip-flight-search-and-selection.spec.ts`

**Steps:**
  1. Start from a fresh browser page and open the Flight Booking practice page through the existing FlightSearchPage entry point.
    - expect: The Search Flights section is visible in its blank initial state.
  2. Select New York as the departure city, London as the destination city, enter a future departure date of 2027-08-01 and return date of 2027-08-10, leave One Way unchecked, and submit Search Flights.
    - expect: The application advances to Choose your flights.
    - expect: A Departure · New York → London section is displayed.
    - expect: A Return · London → New York section is displayed.
    - expect: Flight options are shown for both legs.
    - expect: Continue to passenger details is disabled until both legs are selected.
  3. Change Sort by to Duration: Shortest and enable Non-stop only.
    - expect: The flight list updates to the selected sort/filter state.
    - expect: Only non-stop options remain visible in each applicable flight section.
    - expect: The results page remains on the same search and selection step.
  4. Select the Global Wings GW100 departure and Global Wings GW200 return options.
    - expect: Each selected option changes to a selected state.
    - expect: The departure and return selections remain distinguishable.
    - expect: Continue to passenger details becomes enabled.
  5. Click Continue to passenger details.
    - expect: The Passenger details step is displayed.
    - expect: Full name, Email, Phone, and Continue to payment controls are visible.

#### 1.3. TC05 - should complete a valid round-trip booking and display confirmation

**File:** `tests/TC05_round-trip-flight-booking-confirmation.spec.ts`

**Steps:**
  1. Start from a fresh browser page and open the Flight Booking practice page through the existing FlightSearchPage entry point.
    - expect: The Search Flights section is visible.
  2. Search a round trip from New York to London with departure date 2027-08-01 and return date 2027-08-10, using one passenger and Economy class.
    - expect: Choose your flights is displayed with New York → London departure options and London → New York return options.
  3. Select Global Wings GW100 for departure and Global Wings GW200 for return, then continue to passenger details.
    - expect: The Passenger details step is displayed.
    - expect: The selected flights are retained for the booking.
  4. Enter passenger details: full name Ada Lovelace, email ada@example.com, and phone +15550100; then continue to payment.
    - expect: The Payment step is displayed.
    - expect: The payment summary lists Global Wings (GW100) and Global Wings (GW200).
    - expect: The summary shows one passenger in Economy class and the calculated total is $420.
  5. Enter card number 4111111111111111, expiry 12/30, and CVV 123, then click Pay & Confirm Booking.
    - expect: The booking completes successfully.
    - expect: The Done step or confirmation view is displayed.
    - expect: A Booking Confirmed! heading is visible.
    - expect: A non-empty booking reference is displayed.
