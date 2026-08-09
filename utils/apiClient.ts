import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Thin wrapper around Playwright's built-in APIRequestContext.
 * Centralizes base-path handling so API tests don't repeat full URLs,
 * mirroring how a REST Assured base spec would be structured in Java.
 */
export class ApiClient {
  constructor(private readonly request: APIRequestContext, private readonly basePath = '') {}

  async get(endpoint: string, params?: Record<string, string>): Promise<APIResponse> {
    return this.request.get(`${this.basePath}${endpoint}`, { params });
  }

  async post(endpoint: string, form: Record<string, string>): Promise<APIResponse> {
    // automationexercise.com's API expects multipart/form style data
    return this.request.post(`${this.basePath}${endpoint}`, { form });
  }

  async put(endpoint: string, form: Record<string, string>): Promise<APIResponse> {
    return this.request.put(`${this.basePath}${endpoint}`, { form });
  }

  async delete(endpoint: string, form?: Record<string, string>): Promise<APIResponse> {
    return this.request.delete(`${this.basePath}${endpoint}`, { form });
  }
}
