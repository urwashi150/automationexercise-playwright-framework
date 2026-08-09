import { APIResponse } from '@playwright/test';

export const jsonHeaders = {
  Accept: 'application/json',
};

export async function parseJsonResponse(response: APIResponse) {
  const contentType = response.headers()['content-type'] || '';
  const text = await response.text();

  if (!contentType.includes('application/json') && !contentType.includes('text/html')) {
    throw new Error(
      `Expected JSON response but got content-type=${JSON.stringify(contentType)}. Response body:\n${text.slice(0, 1000)}`
    );
  }

  try {
    return JSON.parse(text);
  } catch (error: unknown) {
    throw new Error(
      `Failed to parse JSON response: ${error instanceof Error ? error.message : String(error)}. Response body:\n${text.slice(0, 1000)}`
    );
  }
}

export async function retryRequest(
  requestFn: () => Promise<APIResponse>,
  retries = 2,
  delayMs = 1000
): Promise<APIResponse> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await requestFn();
      if (response.ok()) {
        return response;
      }
      lastError = new Error(`Request failed with HTTP ${response.status()}`);
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}
