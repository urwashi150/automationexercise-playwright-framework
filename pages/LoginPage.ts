import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Login form
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginBtn: Locator;
  readonly loginErrorMsg: Locator;

  // Signup form
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupBtn: Locator;
  readonly signupErrorMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginBtn = page.locator('[data-qa="login-button"]');
    this.loginErrorMsg = page.locator('p:has-text("Your email or password is incorrect!")');

    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupBtn = page.locator('[data-qa="signup-button"]');
    this.signupErrorMsg = page.locator('p:has-text("Email Address already exist!")');
  }

  async open() {
    await this.goto('/login');
  }

  async login(email: string, password: string) {
    await this.fillField(this.loginEmailInput, email);
    await this.fillField(this.loginPasswordInput, password);
    await this.clickWhenReady(this.loginBtn);
  }

  async startSignup(name: string, email: string) {
    await this.fillField(this.signupNameInput, name);
    await this.fillField(this.signupEmailInput, email);
    await this.clickWhenReady(this.signupBtn);
  }

  async getLoginErrorText(): Promise<string | null> {
    return this.loginErrorMsg.textContent();
  }
}
