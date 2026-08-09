import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly signupLoginLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly loggedInAsText: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly contactUsLink: Locator;
  readonly subscriptionEmailInput: Locator;
  readonly subscriptionSubmitBtn: Locator;
  readonly subscriptionSuccessMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.loggedInAsText = page.locator('a:has-text("Logged in as")');
    this.productsLink = page.locator('a[href="/products"]');
    this.cartLink = page.locator('a[href="/view_cart"]');
    this.contactUsLink = page.locator('a[href="/contact_us"]');
    this.subscriptionEmailInput = page.locator('#susbscribe_email');
    this.subscriptionSubmitBtn = page.locator('#subscribe');
    this.subscriptionSuccessMsg = page.locator('#success-subscribe');
  }

  async open() {
    await this.goto('/');
  }

  async goToSignupLogin() {
    await this.clickWhenReady(this.signupLoginLink);
  }

  async goToProducts() {
    await this.clickWhenReady(this.productsLink);
  }

  async goToCart() {
    await this.clickWhenReady(this.cartLink);
  }

  async isLoggedInAs(name: string): Promise<boolean> {
    const text = await this.loggedInAsText.textContent();
    return !!text && text.includes(name);
  }

  async subscribeToNewsletter(email: string) {
    await this.scrollToElement(this.subscriptionEmailInput);
    await this.fillField(this.subscriptionEmailInput, email);
    await this.clickWhenReady(this.subscriptionSubmitBtn);
  }
}
