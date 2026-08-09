# Automation Exercise — Playwright Framework

A Playwright + TypeScript automation framework built against
[automationexercise.com](https://automationexercise.com), covering both **UI** and **API** layers.

## Why this structure

| Layer | Purpose |
|---|---|
| `pages/` | Page Object Model — one class per page, exposing actions only (no assertions) |
| `fixtures/` | Custom Playwright fixtures that auto-inject page objects + API client into every test |
| `tests/ui/` | UI specs — signup, login, product search, cart/checkout |
| `tests/api/` | API specs against automationexercise.com's public REST API |
| `utils/` | Test data generator, API client wrapper |
| `config/` | Environment configuration (`.env`-driven) |

## Setup

```bash
npm install
npx playwright install --with-deps   # downloads browser binaries
cp .env.example .env                 # fill in TEST_USER_EMAIL/PASSWORD if you have an account
```

## Running tests

```bash
npm test                 # everything, all browsers
npm run test:ui          # UI specs only
npm run test:api         # API specs only
npm run test:chromium    # single browser
npm run test:headed      # watch it run
npm run test:debug       # step through with the Playwright inspector
npm run report           # open the last HTML report
npx playwright codegen https://automationexercise.com   # record new locators
```

Run a single file or tagged subset:
```bash
npx playwright test tests/ui/login.spec.ts
npx playwright test --grep @smoke
```

## What's covered

**UI (`tests/ui/`)**
- Signup: new account creation end-to-end, duplicate-email handling
- Login: invalid credentials, valid login (skipped unless `.env` has real creds)
- Product search: full catalog listing, keyword search, empty-result search
- Cart/checkout: add to cart, multi-item cart, guest-checkout redirect to login

**API (`tests/api/`)**
- `productsList`, `brandsList` — GET endpoints, schema checks, unsupported-method handling
- Full account lifecycle — `createAccount` → `verifyLogin` → `getUserDetailByEmail` →
  `updateAccount` → `deleteAccount`, run as a serial chain against one seeded user, ending
  with a cleanup-verification check

## Design decisions worth knowing for an interview

- **No assertions inside page objects** — pages only expose actions/locators; specs own the
  assertions, so page objects stay reusable across positive and negative test paths.
- **Fixtures over manual instantiation** — every spec gets `homePage`, `cartPage`, etc. already
  wired to the current `page`, removing constructor boilerplate from test files.
- **`test.describe.serial` for the account lifecycle** — deliberately not independent tests,
  since create → verify → update → delete only makes sense against the same record in order.
- **Trace/video/screenshot on failure only** (`retain-on-failure`) — keeps CI artifacts small
  while still giving full failure diagnostics when something breaks.
- **JUnit reporter enabled** — plugs straight into Jenkins' test-result publisher, matching a
  typical enterprise CI/CD setup.
- **Sharded CI matrix** — splits the suite across 3 parallel GitHub Actions runners to keep
  pipeline time down as the suite grows.

## Extending this framework

- Add a new page → create `pages/NewPage.ts` extending `BasePage`, register it in
  `fixtures/pageFixtures.ts`.
- Add Cucumber/BDD on top → `@cucumber/cucumber` + `playwright-bdd` slot in cleanly since
  page objects and fixtures are already decoupled from spec syntax.
- Add visual regression → `expect(page).toHaveScreenshot()` works out of the box with the
  existing config.
