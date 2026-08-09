import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage holds behavior shared by every page object:
 * navigation, waiting helpers, and common assertions.
 * Concrete page objects extend this rather than duplicating boilerplate.
 */
export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async waitForVisible(locator: Locator, timeout = 10_000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async clickWhenReady(locator: Locator) {
    await this.waitForVisible(locator);
    await locator.click();
  }

  async fillField(locator: Locator, value: string) {
    await this.waitForVisible(locator);
    await locator.fill(value);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async assertUrlContains(fragment: string) {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }

  async scrollToElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  async acceptDialog() {
    this.page.once('dialog', (dialog) => dialog.accept());
  }
}
