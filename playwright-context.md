# Playwright Automation Context

## 1. PROJECT PURPOSE

This project is a **Travel Booking E2E Automation POC** using:

* Playwright Test
* TypeScript
* Node.js
* Page Object Model (POM)

Primary AUT:

* QA Practice Travel / Flight Booking application

The automation must be:

* Reliable
* Deterministic
* Maintainable
* Reusable
* CI-ready
* Parallel-safe
* Easy to debug
* Minimal without losing correctness

Optimize for **first-run success**, but never claim a test is correct without execution/verification.

---

## 2. AUTHORITATIVE ARCHITECTURE

Use these ownership rules strictly:

| Concern                        | Owner                             |
| ------------------------------ | --------------------------------- |
| Environment URL / baseURL      | `playwright.config.ts`            |
| Page route/path                | Page Object                       |
| Locators                       | Page Object                       |
| UI interaction                 | Page Object                       |
| Reusable business actions      | Page Object                       |
| Test scenario/business flow    | `tests/*.spec.ts`                 |
| Test data                      | `test-data/` or test data fixture |
| Reusable cross-cutting helpers | `utils/`                          |
| Browser/configuration          | `playwright.config.ts`            |

### Critical rule

**Test files must not contain hardcoded application URLs.**

Do not use:

```ts
await page.goto('https://www.qapractice.com/flight-booking-scenarios/');
```

inside a test.

Do not put environment URLs inside Page Objects either.

Use:

```text
playwright.config.ts
        ↓
      baseURL
        ↓
Page Object route
        ↓
page.goto('/')
```

or an equivalent relative route.

---

## 3. PROJECT URL ARCHITECTURE

For this POC, keep the domain in configuration.

Example:

```ts
use: {
  baseURL: process.env.BASE_URL || 'https://www.qapractice.com'
}
```

Environment-specific values must remain configurable.

Example:

```text
BASE_URL=https://www.qapractice.com
```

The Page Object owns the application route:

```ts
async open() {
  await this.page.goto('/flight-booking-scenarios/');
}
```

The test only calls:

```ts
await flightSearchPage.open();
```

Therefore:

```text
TC
 ↓
Page Object
 ↓
relative route
 ↓
Playwright baseURL
 ↓
environment
```

Never duplicate URLs across tests.

---

## 4. TEST CASE FILE CREATION

When the user provides a TC filename, use the **exact filename**.

Example:

```text
tests/TC01_one-way-flight-booking.spec.ts
```

Rules:

* Create it under `tests/`.
* Do not rename it.
* Do not replace it with a generic filename.
* Do not create the TC outside `tests/`.
* Do not create multiple files for the same TC unless explicitly required.
* Keep the TC ID in the test title.

Example:

```ts
test('TC01 - should successfully complete a one-way flight booking', async ({ page }) => {
});
```

---

## 5. POM PROJECT STRUCTURE

Follow this project structure:

```text
playwright-travel-poc/
├── tests/
│   ├── TC01_one-way-flight-booking.spec.ts
│   └── ...
│
├── pages/
│   ├── FlightSearchPage.ts
│   ├── SearchResultsPage.ts
│   ├── BookingPage.ts
│   └── ...
│
├── test-data/
│   └── ...
│
├── utils/
│   └── ...
│
├── playwright.config.ts
└── package.json
```

Create missing folders/files automatically when required by the TC.

Do not create:

* Empty folders
* Empty files
* Duplicate Page Objects
* Unused utilities
* Unused test-data files

---

## 6. TC → FILE CREATION PROCESS

Whenever a new TC is requested:

1. Read the TC objective and steps.
2. Inspect the existing framework.
3. Inspect the actual application flow.
4. Identify all pages/components involved.
5. Reuse existing Page Objects when available.
6. Create missing Page Objects under `pages/`.
7. Create the requested TC under `tests/`.
8. Create `test-data/` files only when required.
9. Create `utils/` files only when reusable functionality genuinely requires them.
10. Connect everything using the existing framework architecture.
11. Execute and validate the TC.
12. Only after the TC passes successfully, create a markdown file in `.github/prompts/` using the test case name.
13. The markdown file must contain the test case name, summary, and the step-by-step prompt/instruction list derived from the passed TC.

Rule:

* Do not create the `.github/prompts/*.md` file while the TC is still failing or unverified.
* Create it only after a successful execution result.
* Keep the file name aligned with the TC name, for example `TC01_one-way-flight-booking.md`.
* The file should include structured prompt content such as title, objective, steps, expected result, and reusable guidance for future execution.

Do not create framework files merely because they might be useful later.

---

## 7. TEST FILE RESPONSIBILITY

A test file represents the **business scenario**.

The test should contain:

* Scenario setup
* Calls to Page Object business methods
* Business-level assertions
* Test-specific data only when appropriate

The test should NOT contain:

* Absolute URLs
* Raw selectors
* Repeated low-level UI interaction
* Browser configuration
* Environment logic
* Large utility implementations
* Duplicate page logic

Preferred:

```ts
await flightSearchPage.open();
await flightSearchPage.searchOneWayFlight(origin, destination, date);
await searchResultsPage.selectFlight(flightNumber);
await bookingPage.enterPassengerDetails(passenger);
await bookingPage.completeBooking();
await confirmationPage.verifyBookingConfirmed();
```

Avoid:

```ts
await page.getByRole(...).click();
await page.locator(...).fill(...);
await page.goto('https://...');
```

when those actions belong to Page Objects.

---

## 8. PAGE OBJECT RESPONSIBILITY

A Page Object contains:

* Locators
* Page/component-specific interactions
* Reusable business actions
* Page-specific navigation route
* Page-specific state handling

Example:

```ts
export class FlightSearchPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/flight-booking-scenarios/');
  }

  async searchOneWayFlight(origin: string, destination: string, date: string) {
    // implementation
  }
}
```

Page Objects should hide locator implementation from tests.

Prefer:

```text
searchOneWayFlight()
selectFlight()
enterPassengerDetails()
completePayment()
verifyBookingConfirmed()
```

over exposing individual low-level interactions unless the test specifically needs them.

---

## 9. PAGE OBJECT BOUNDARIES

Use logical application boundaries.

For this POC, use the documented POM structure:

```text
FlightSearchPage
SearchResultsPage
BookingPage
```

Add additional Page Objects only when the actual application contains a sufficiently separate logical page/component that benefits from its own abstraction.

Do not create classes solely to increase the number of files.

Do not put the entire application into one giant Page Object.

Do not split every button/action into its own Page Object.

---

## 10. NAVIGATION RULES

Absolute URLs belong only in configuration.

Routes belong in Page Objects.

Tests invoke navigation through Page Objects.

Correct:

```text
playwright.config.ts
    baseURL = https://www.qapractice.com

FlightSearchPage.ts
    page.goto('/flight-booking-scenarios/')

TC01
    flightSearchPage.open()
```

Incorrect:

```ts
await page.goto('https://www.qapractice.com/flight-booking-scenarios/');
```

inside a test.

This rule applies to every TC.

---

## 11. LOCATOR STRATEGY

Preferred order:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `getByTestId()`
6. Stable attribute/CSS locator
7. XPath only when genuinely necessary

Use the most stable locator supported by the actual application.

Prefer semantic/user-facing locators.

Avoid:

* Generated class names
* Dynamic IDs
* Long CSS chains
* Long XPath
* Styling-dependent selectors
* Arbitrary positional selectors
* `nth()` when a unique locator is possible

Never invent selectors.

If multiple elements match, narrow the locator using:

* Parent scope
* Role
* Label
* Stable attribute
* Meaningful text

---

## 12. ACTUAL APPLICATION VALIDATION

Before writing selectors, inspect the actual application.

Verify:

* Element exists
* Element role/label/text
* Attribute/test ID
* Interaction behavior
* Page transition
* Expected state
* Validation behavior

Do not rely only on the requirement document when actual UI behavior can be inspected.

The requirement defines **what** to test.

The application defines **how** to interact with it.

---

## 13. WAITING / SYNCHRONIZATION

Use Playwright auto-waiting and web-first assertions.

Prefer:

```ts
await expect(locator).toBeVisible();
await expect(locator).toBeEnabled();
await expect(locator).toHaveText(...);
await expect(page).toHaveURL(...);
```

Use event/state-based waiting when required.

Never use arbitrary sleeps as normal synchronization:

```ts
await page.waitForTimeout(3000);
```

Avoid waiting based on guessed time.

Wait for the actual business/UI condition.

---

## 14. ASSERTION RULES

Every important business flow must have meaningful assertions.

Assertions should verify:

* Expected page/state
* Expected result
* Expected validation
* Expected business outcome

Do not create a test that only performs clicks/fills.

Do not weaken an assertion just to make the test pass.

Do not replace an important business assertion with a weaker technical assertion.

---

## 15. TEST STRUCTURE

Follow:

```text
Arrange
  ↓
Act
  ↓
Assert
```

Keep each TC focused on one business scenario.

A TC must be:

* Independent
* Deterministic
* Readable
* Reusable
* Parallel-safe

Do not combine unrelated scenarios into one test.

---

## 16. TEST INDEPENDENCE

Tests must not depend on:

* Execution order
* Another test
* Another test's data
* Shared mutable state
* Previous browser sessions

A TC must pass when:

* Run alone
* Run in the full suite
* Run in parallel

Use Playwright's isolated test/browser context.

---

## 17. TEST DATA

Use deterministic test data.

Data should come from:

* Existing project data
* Test data files
* Fixtures
* Environment variables
* Reusable helpers

Use inline data when the dataset is small and scenario-specific.

Use external data when the data must be reused or data-driven execution is required.

Never hardcode:

* Passwords
* API keys
* Tokens
* Secrets
* Real payment information
* Production credentials

Use dummy data for this practice application.

---

## 18. ARRAY / DATA-DRIVEN TESTS

When the TC explicitly requires multiple datasets, use Playwright-supported data-driven patterns.

Do not duplicate identical test code for each dataset.

Use reusable test logic.

Example concept:

```ts
const searchData = [
  { origin: 'Bangalore', destination: 'Delhi' },
  { origin: 'Mumbai', destination: 'Delhi' }
];
```

Each dataset should execute the same reusable business flow.

---

## 19. EXCEL TEST DATA

When Excel-based testing is explicitly required:

* Store files under `test-data/`
* Reuse an existing Excel utility if available
* Create `utils/excelReader.ts` only when needed
* Keep Excel parsing out of Page Objects
* Keep Excel parsing out of individual business methods

Use `xlsx` when this POC requires Excel support.

---

## 20. API / BACKEND / DATABASE

API/backend/database operations may be used for:

* Setup
* Test data creation
* Cleanup
* Backend verification
* Efficient preconditions

Do not replace UI testing with API testing when the TC is specifically a UI scenario.

Never invent:

* Endpoints
* Payloads
* Response fields
* Database tables
* Queries

Reuse existing project helpers when available.

---

## 21. AUTHENTICATION

Reuse the framework's existing authentication mechanism.

Prefer:

* Storage state
* Fixtures
* API authentication
* Existing login utilities

Do not log in through UI in every test if the framework already provides authenticated state.

Never expose credentials.

---

## 22. SPECIAL UI HANDLING

Use Playwright-native APIs for:

### Frames

`frameLocator()` / frame APIs

### Multiple pages/windows

`context.waitForEvent('page')`

### Downloads

`page.waitForEvent('download')`

### Dialogs

Register handlers before triggering the dialog

### File upload

`setInputFiles()`

### Shadow DOM

Use Playwright locators against open Shadow DOM

Do not use arbitrary waits for these cases.

---

## 23. CONFIGURATION

`playwright.config.ts` owns framework/environment configuration.

Examples:

* `baseURL`
* Browsers/projects
* Workers
* Retries
* Timeout
* Reporter
* Trace
* Screenshot
* Video
* Storage state

Do not unnecessarily modify existing configuration for a single TC.

Do not put environment logic inside tests.

---

## 24. ENVIRONMENT HANDLING

The same test suite must be able to run against supported environments through configuration.

Tests should not know whether they are running against:

* QE
* Pre-Prod
* Prod
* Local

Use environment/configuration mechanisms.

The TC must remain unchanged.

---

## 25. TYPEScript RULES

Use clean TypeScript.

Prefer:

* `const`
* Strong typing
* Interfaces/types where useful
* Reusable methods
* Clear naming

Avoid:

* Unnecessary `any`
* Duplicate logic
* Excessive abstraction
* Unreadable one-liners

Keep imports valid and minimal.

---

## 26. REUSABILITY

Before creating new code, check whether equivalent functionality already exists.

Reuse:

* Page Objects
* Page methods
* Utilities
* Fixtures
* Test data
* API helpers

Extend existing code instead of creating duplicates when appropriate.

Never create:

```text
FlightSearchPage2.ts
FlightBookingPageNew.ts
excelReaderNew.ts
```

to solve a problem already covered by existing files.

---

## 27. ERROR HANDLING

Do not hide failures.

Avoid broad `try/catch`.

Use error handling only when:

* Recovery is intentional
* Cleanup is required
* A meaningful error needs to be added

Never:

* Catch assertion errors and continue
* Swallow exceptions
* Convert failure into pass
* Skip broken steps silently

---

## 28. RETRIES

Retries are for genuinely transient failures.

Never use retries to hide:

* Bad selectors
* Race conditions
* Incorrect assertions
* Wrong test data
* Broken test logic
* Product defects

A test that only passes after retries requires investigation.

---

## 29. PARALLEL EXECUTION

All independent TCs must support parallel execution.

Avoid shared:

* Mutable accounts
* Files
* Data
* State

Do not assume execution order.

Do not make TC02 depend on TC01.

---

## 30. REPORTING / DEBUGGING

Use existing Playwright reporting.

When investigating failures, inspect:

* Error message
* Stack trace
* Screenshot
* Trace
* Video when enabled
* Execution step
* Console/network evidence when relevant

Do not add unnecessary custom diagnostics.

---

## 31. FAILURE ANALYSIS

When a TC fails, identify the root cause.

Possible categories:

* Locator
* Timing/synchronization
* Test data
* Environment
* Framework usage
* Application behavior
* Assertion
* Test logic

Fix the actual cause.

Do not:

* Add random waits
* Make assertions weaker
* Skip the failing step
* Catch the error
* Add blind retry

---

## 32. TEST EXECUTION AND REGRESSION PROTECTION

Generated or modified code is not considered validated until executed.

After implementing or modifying any TC:

1. Run the new or modified TC.
2. Analyze any failure and identify the root cause.
3. Fix the root cause.
4. Re-run the new or modified TC until it passes.
5. Identify existing TCs affected by any modified shared code.
6. Re-run all affected existing TCs.
7. If any previously passing TC now fails, treat it as a regression.
8. Investigate and fix the regression instead of weakening the affected TC.
9. Re-run the new or modified TC and all affected existing TCs.
10. Confirm that the change has not introduced any known regression.
11. Run the complete test suite when the change affects shared or framework-wide functionality.
12. Only consider the implementation complete when the requested functionality passes and existing affected functionality continues to pass.

### Shared Code Regression Rule

Additional regression validation is required when modifying code used by multiple TCs, including:

- Page Objects
- Page Object methods
- Locators
- Fixtures
- Utilities
- Authentication helpers
- API helpers
- Test-data helpers
- Configuration
- Shared setup/teardown

When modifying shared code:

- Preserve existing behavior whenever possible.
- Prefer additive changes over unnecessary modification of existing methods.
- Do not modify existing TCs merely to accommodate a new implementation.
- Do not weaken existing assertions to make tests pass.
- Do not use retries, arbitrary waits, exception swallowing, or test skipping to hide regressions.

### Regression Definition

A regression occurs when functionality that previously passed starts failing after a subsequent code or framework change.

A new TC passing does not prove that the change is safe.

The required state is:

```text
New or modified TC = PASS
        +
Affected existing TCs = PASS
        ↓
Change accepted

Generated code is not considered validated until executed.

After implementing a TC:

1. Run the requested TC.
2. Analyze the first failure.
3. Fix the root cause.
4. Run again.
5. Confirm independent pass.
6. Run relevant related tests when appropriate.
7. Ensure the fix did not break existing tests.

Never claim guaranteed first-run success before execution.

---
## 33. MINIMAL-CHANGE RULE

When modifying the framework:

* Preserve working code.
* Change only what the TC requires.
* Avoid unrelated refactoring.
* Do not redesign the framework for a single test.
* Keep changes focused.
* Reuse existing implementations.

---

## 34. SECURITY RULES

Never commit or expose:

* Passwords
* API keys
* Tokens
* Client secrets
* Private certificates
* Real payment details

Use dummy data only.

Do not log sensitive information.

---

## 35. NAMING CONVENTION

Use clear business-oriented names.

Example:

```text
tests/
└── TC01_one-way-flight-booking.spec.ts
```

```text
pages/
├── FlightSearchPage.ts
├── SearchResultsPage.ts
└── BookingPage.ts
```

Test title:

```ts
test('TC01 - should successfully complete a one-way flight booking', ...)
```

Methods:

```text
open()
searchOneWayFlight()
selectFlight()
enterPassengerDetails()
completePayment()
verifyBookingConfirmed()
```

Avoid:

* `test1`
* `clickButton`
* `doStuff`
* `page1`
* `commonMethod`

---

## 36. REQUIRED FILE CREATION LOGIC

For every new TC:

### Step 1

Create the exact TC file:

```text
tests/<USER_PROVIDED_FILENAME>.spec.ts
```

### Step 2

Identify required pages/components.

### Step 3

Reuse existing Page Objects.

### Step 4

Create only missing required Page Objects under:

```text
pages/
```

### Step 5

Create only required reusable test data under:

```text
test-data/
```

### Step 6

Create only required cross-cutting utilities under:

```text
utils/
```

### Step 7

Use config for environment/baseURL.

### Step 8

Use Page Objects for routes/navigation and UI interaction.

### Step 9

Use the TC only for business flow and assertions.

### Step 10

Execute and validate.

---

## 37. TC INFORMATION BOUNDARY

TC-specific information is supplied separately from this file.

The TC definition may contain:

* TC ID
* Filename
* Objective
* Preconditions
* Business steps
* Test data
* Expected result
* Negative/positive scenario
* Special requirements

This context defines **HOW to implement the TC**.

The TC definition defines **WHAT to implement**.

Do not invent missing business requirements.

Do not silently change requested steps.

If an implementation detail must differ because the actual application behaves differently, use the real application behavior and keep the business objective intact.

---

## 38. FINAL QUALITY GATE

Before marking a TC complete, verify all of the following:

### Architecture

* TC is under `tests/`
* Exact filename is preserved
* POM is used
* Existing Page Objects are reused
* Required missing Page Objects are created
* No unnecessary files were created

### URL / Configuration

* No absolute URL exists in TC
* Environment URL exists only in config
* Page route is owned by Page Object
* Environment switching does not require TC changes

### Automation

* Real locators were verified
* No fabricated selectors
* No arbitrary waits
* Assertions verify business outcomes
* Test is independent
* Test is parallel-safe

### Code

* TypeScript is valid
* Imports are correct
* No duplicated logic
* No hardcoded secrets
* Naming follows project convention

### Verification

* TC was executed
* Failures were investigated
* Root causes were fixed
* Final result was verified

---

## 39. GOLDEN RULE

Always maintain this separation:

```text
playwright.config.ts
    ↓
Environment / baseURL

Page Object
    ↓
Route + Locators + UI Actions + Reusable Business Methods

Test Case
    ↓
Business Scenario + Test Data + Assertions
```

**Never move responsibilities between these layers without a real architectural reason.**

The goal is not merely to make an automated test run.

The goal is to build a **clean, reusable Playwright E2E framework where additional TCs can be added without duplicating selectors, URLs, navigation logic or framework code.**
