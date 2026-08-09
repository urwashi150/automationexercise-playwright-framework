import { test, expect } from '@playwright/test';
import { jsonHeaders, parseJsonResponse, retryRequest } from './apiHelpers';

/**
 * Covers the account-lifecycle endpoints. This is deliberately written as
 * one linear flow (not independent tests) because create -> verify -> update
 * -> delete must happen against the SAME account in sequence for the API
 * to behave meaningfully -- mirrors how you'd sequence a data-setup chain
 * in REST Assured for a stateful workflow.
 */
test.describe.serial('User Account Lifecycle API @api', () => {
  const email = `qa.api.user.${Date.now()}@example.com`;
  const password = 'Qa@Automation123';
  const name = 'QA Automation User';

  test('POST /createAccount creates a new user', async ({ request }) => {
    const response = await retryRequest(() =>
      request.post('createAccount', {
        headers: jsonHeaders,
        form: {
          name,
          email,
          password,
          title: 'Mr',
          birth_date: '10',
          birth_month: '5',
          birth_year: '1995',
          firstname: 'QA',
          lastname: 'User',
          company: 'Capgemini',
          address1: '221B Baker Street',
          address2: '',
          country: 'India',
          zipcode: '411001',
          state: 'Maharashtra',
          city: 'Pune',
          mobile_number: '9876543210',
        },
      })
    );

    const body = await parseJsonResponse(response);
    expect(body.responseCode).toBe(201);
    expect(body.message).toContain('User created');
  });

  test('POST /verifyLogin confirms the new account authenticates', async ({ request }) => {
    const response = await retryRequest(() =>
      request.post('verifyLogin', {
        headers: jsonHeaders,
        form: { email, password },
      })
    );
    const body = await parseJsonResponse(response);

    expect(body.responseCode).toBe(200);
    expect(body.message).toContain('User exists');
  });

  test('GET /getUserDetailByEmail returns the account we just created', async ({ request }) => {
    const response = await retryRequest(() =>
      request.get('getUserDetailByEmail', {
        headers: jsonHeaders,
        params: { email },
      })
    );
    const body = await parseJsonResponse(response);

    expect(body.responseCode).toBe(200);
    expect(body.user.email).toBe(email);
    expect(body.user.first_name).toBe('QA');
  });

  test('PUT /updateAccount updates the account details', async ({ request }) => {
    const response = await retryRequest(() =>
      request.put('updateAccount', {
        headers: jsonHeaders,
        form: {
          name,
          email,
          password,
          title: 'Mr',
          birth_date: '10',
          birth_month: '5',
          birth_year: '1995',
          firstname: 'QA-Updated',
          lastname: 'User',
          company: 'Capgemini',
          address1: '221B Baker Street',
          address2: '',
          country: 'India',
          zipcode: '411001',
          state: 'Maharashtra',
          city: 'Pune',
          mobile_number: '9876543210',
        },
      })
    );

    const body = await parseJsonResponse(response);
    expect(body.responseCode).toBe(200);
    expect(body.message).toContain('User updated');
  });

  test('DELETE /deleteAccount removes the account (cleanup)', async ({ request }) => {
    const response = await retryRequest(() =>
      request.delete('deleteAccount', {
        headers: jsonHeaders,
        form: { email, password },
      })
    );
    const body = await parseJsonResponse(response);

    expect(body.responseCode).toBe(200);
    expect(body.message).toContain('Account deleted');
  });

  test('verifyLogin fails after account deletion, confirming cleanup worked', async ({ request }) => {
    const response = await retryRequest(() =>
      request.post('verifyLogin', {
        headers: jsonHeaders,
        form: { email, password },
      })
    );
    const body = await parseJsonResponse(response);

    expect(body.responseCode).toBe(404);
  });
});
