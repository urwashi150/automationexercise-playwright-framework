import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage holds behavior shared by every page object:
 * navigation, waiting helpers, and common assertions.
 * Concrete page objects extend this rather than duplicating boilerplate.
 */
export class BasePage {
  constructor(protected readonly page: Page) {}

  protected getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async goto(path: string = '/') {
    await this.page.goto(path, { timeout: 60_000, waitUntil: 'load' });
    await this.page.waitForLoadState('networkidle', { timeout: 60_000 });
  }

  async waitForVisible(target: string | Locator, timeout = 15_000) {
    const locator = typeof target === 'string' ? this.getLocator(target) : target;
    await locator.waitFor({ state: 'visible', timeout });
  }

  async clickWhenReady(target: string | Locator) {
    const locator = typeof target === 'string' ? this.getLocator(target) : target;
    await this.waitForVisible(locator);
    await locator.click();
  }

  async fillField(target: string | Locator, value: string) {
    const locator = typeof target === 'string' ? this.getLocator(target) : target;
    await this.waitForVisible(locator);
    await locator.fill(value);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async assertUrlContains(fragment: string) {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }

  async scrollToElement(target: string | Locator) {
    const locator = typeof target === 'string' ? this.getLocator(target) : target;
    await locator.scrollIntoViewIfNeeded();
  }

  async acceptDialog() {
    this.page.once('dialog', (dialog) => dialog.accept());
  }
}
