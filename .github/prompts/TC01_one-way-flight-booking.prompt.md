---

description: Create TC01 one-way flight booking E2E test using the project's Playwright POM architecture.
mode: agent
-----------

# TC01 - One-Way Flight Booking

Implement this test case using the existing project architecture.

## Required Context

Follow:

* `../../playwright-context.md`
* existing `AGENTS.md`
* existing project code and configuration

Do not duplicate or override framework rules.

## Test File

Create/use exactly:

`tests/TC01_one-way-flight-booking.spec.ts`

## Objective

Verify that a user can successfully complete a one-way flight booking from flight search through confirmation.

## Preconditions

* Flight Booking application is available.
* Use dummy passenger/payment data only.

## Test Data

```text
Origin: New York
Destination: London
Trip Type: One Way
Departure Date: Valid future date
Passenger Name: Ada Lovelace
Email: ada@example.com
Phone: +15550100
Card Number: 4111111111111111
Expiry: 12/30
CVV: 123
Flight: GW100
```

## Business Steps

1. Open the Flight Booking page.
2. Select `New York` as origin.
3. Select `London` as destination.
4. Select a valid future departure date.
5. Select `One Way`.
6. Search for flights.
7. Verify flight results are displayed.
8. Select flight `GW100`.
9. Continue to passenger details.
10. Enter passenger name, email and phone.
11. Continue to payment/review.
12. Enter the dummy payment details required by the application.
13. Submit the booking.
14. Verify the booking confirmation state.
15. Verify the booking reference/PNR when available.

## Expected Result

The one-way booking completes successfully and the application displays the expected confirmation state and booking reference/PNR when provided.

## Implementation Rules

* Do not hardcode the application URL in the test.
* Do not put absolute URLs in Page Objects.
* Use the existing `baseURL` from `playwright.config.ts`.
* Page Object owns the application route/navigation.
* Test file contains business flow and assertions.
* Locators and UI interactions belong in Page Objects.
* Reuse existing Page Objects before creating new ones.
* Create only missing Page Objects required by this TC.
* Verify actual application behavior before inventing selectors or fields.
* Use stable Playwright locators.
* Do not use `waitForTimeout()` unless technically unavoidable and justified.
* Use web-first assertions.
* Keep the test independent and parallel-safe.
* Execute the TC after implementation and fix root causes of failures.
* Do not weaken assertions to force a pass.

## Completion Requirements

Before finishing:

1. `tests/TC01_one-way-flight-booking.spec.ts` exists.
2. Required Page Objects exist under `pages/`.
3. Existing framework components are reused.
4. No duplicate utilities/Page Objects are created.
5. Test contains no hardcoded application URL.
6. Test uses POM.
7. Assertions validate business outcomes.
8. TC executes successfully.
