## Use the Playwright Planner.

Create a test plan for the following 3 test cases:

TC01: <TC name/objective>
TC02: <TC name/objective>
TC03: <TC name/objective>

First inspect the existing project structure and explore the actual application.

Follow playwright-context.md as the authoritative project architecture.

Do not create or modify automation code.
Create/update only the test plan.


## Use the Playwright Generator.

Implement the 3 test cases from the generated test plan.

Before generating code:
- Read playwright-context.md.
- Inspect the existing framework and reuse existing Page Objects, fixtures, utilities and test data.
- Explore the actual application to verify locators and flow.

Follow all rules in playwright-context.md.

Use the existing POM architecture.
Create only the required missing files.
Do not create duplicate Page Objects or framework structures.

After implementation, execute the 3 generated tests.

Do not consider the implementation validated until execution confirms the result.


## Use the Playwright Healer.

Run the generated tests and investigate any failures.

Read and follow playwright-context.md.

For each failure:
1. Identify the actual root cause.
2. Inspect the application and execution evidence.
3. Fix only the required automation/framework code.
4. Do not weaken assertions.
5. Do not add arbitrary waits.
6. Do not skip tests or swallow errors.
7. Re-run the affected test.
8. If shared code was modified, follow Section 32 regression rules and run the affected existing tests.

Continue until the requested tests are correctly validated.