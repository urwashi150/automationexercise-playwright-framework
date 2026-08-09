import { test, expect } from '@playwright/test';

/**
 * Direct API tests against automationexercise.com's public API.
 * Uses Playwright's built-in `request` fixture rather than the custom
 * ApiClient fixture, since these run under the dedicated `api` project
 * in playwright.config.ts (baseURL already points at /api).
 */
test.describe('Products API @api', () => {
  test('GET /productsList returns 200 and a non-empty product list', async ({ request }) => {
    const response = await request.get('/productsList');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('each product in the list has required fields', async ({ request }) => {
    const response = await request.get('/productsList');
    const body = await response.json();

    const sample = body.products[0];
    expect(sample).toHaveProperty('id');
    expect(sample).toHaveProperty('name');
    expect(sample).toHaveProperty('price');
    expect(sample).toHaveProperty('category');
  });

  test('POST /productsList is not supported and returns 405-style response', async ({ request }) => {
    const response = await request.post('/productsList');
    const body = await response.json();

    // The API returns HTTP 200 with responseCode 405 in its JSON payload
    // for unsupported methods -- documenting that quirk here rather than
    // asserting on the transport status code.
    expect(body.responseCode).toBe(405);
    expect(body.message).toContain('not supported');
  });

  test('GET /brandsList returns 200 and a non-empty brand list', async ({ request }) => {
    const response = await request.get('/brandsList');
    const body = await response.json();

    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.brands)).toBeTruthy();
    expect(body.brands.length).toBeGreaterThan(0);
  });
});
