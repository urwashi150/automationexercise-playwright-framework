import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { HomePageSelectors } from './selectors';

export class HomePage extends BasePage {
  get signupLoginLink(): Locator {
    return this.getLocator(HomePageSelectors.signupLoginLink);
  }

  get logoutLink(): Locator {
    return this.getLocator(HomePageSelectors.logoutLink);
  }

  get deleteAccountLink(): Locator {
    return this.getLocator(HomePageSelectors.deleteAccountLink);
  }

  get loggedInAsText(): Locator {
    return this.getLocator(HomePageSelectors.loggedInAsText);
  }

  get productsLink(): Locator {
    return this.getLocator(HomePageSelectors.productsLink);
  }

  get cartLink(): Locator {
    return this.getLocator(HomePageSelectors.cartLink);
  }

  get contactUsLink(): Locator {
    return this.getLocator(HomePageSelectors.contactUsLink);
  }

  get subscriptionEmailInput(): Locator {
    return this.getLocator(HomePageSelectors.subscriptionEmailInput);
  }

  get subscriptionSubmitBtn(): Locator {
    return this.getLocator(HomePageSelectors.subscriptionSubmitBtn);
  }

  get subscriptionSuccessMsg(): Locator {
    return this.getLocator(HomePageSelectors.subscriptionSuccessMsg);
  }

  async open() {
    await this.goto('/');
  }

  async goToSignupLogin() {
    await this.clickWhenReady(HomePageSelectors.signupLoginLink);
  }

  async goToProducts() {
    await this.clickWhenReady(HomePageSelectors.productsLink);
  }

  async goToCart() {
    await this.clickWhenReady(HomePageSelectors.cartLink);
  }

  async isLoggedInAs(name: string): Promise<boolean> {
    const text = await this.loggedInAsText.textContent();
    return !!text && text.includes(name);
  }

  async subscribeToNewsletter(email: string) {
    await this.scrollToElement(HomePageSelectors.subscriptionEmailInput);
    await this.fillField(HomePageSelectors.subscriptionEmailInput, email);
    await this.clickWhenReady(HomePageSelectors.subscriptionSubmitBtn);
  }
}
