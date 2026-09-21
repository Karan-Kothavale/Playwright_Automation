---

description: Create TC02 valid flight search E2E test.
agent: agent
------------

# TC02 - Valid Flight Search

## Required Context

Follow:

* [playwright-context.md](../../playwright-context.md)
* Existing project code and configuration

## Test File

`tests/TC02_valid-flight-search.spec.ts`

## Objective

Verify that valid flight search criteria return available flight results.

## Preconditions

* Flight Booking application is available.
* Use valid search data.

## Test Data

```text
Origin: New York
Destination: London
Trip Type: One Way
Departure Date: Valid future date
```

## Steps

1. Open the Flight Booking page.
2. Select `New York` as origin.
3. Select `London` as destination.
4. Select a valid future departure date.
5. Select `One Way`.
6. Click **Search Flights**.
7. Verify that flight results are displayed.
8. Verify that the results correspond to the selected search criteria.

## Expected Result

Flight search completes successfully and valid flight results are displayed for the selected origin, destination and departure date.
