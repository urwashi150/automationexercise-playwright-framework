import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPageSelectors } from './selectors';

export class LoginPage extends BasePage {
  get loginEmailInput(): Locator {
    return this.getLocator(LoginPageSelectors.loginEmailInput);
  }

  get loginPasswordInput(): Locator {
    return this.getLocator(LoginPageSelectors.loginPasswordInput);
  }

  get loginBtn(): Locator {
    return this.getLocator(LoginPageSelectors.loginBtn);
  }

  get loginErrorMsg(): Locator {
    return this.getLocator(LoginPageSelectors.loginErrorMsg);
  }

  get signupNameInput(): Locator {
    return this.getLocator(LoginPageSelectors.signupNameInput);
  }

  get signupEmailInput(): Locator {
    return this.getLocator(LoginPageSelectors.signupEmailInput);
  }

  get signupBtn(): Locator {
    return this.getLocator(LoginPageSelectors.signupBtn);
  }

  get signupErrorMsg(): Locator {
    return this.getLocator(LoginPageSelectors.signupErrorMsg);
  }

  async open() {
    await this.goto('/login');
  }

  async login(email: string, password: string) {
    await this.fillField(LoginPageSelectors.loginEmailInput, email);
    await this.fillField(LoginPageSelectors.loginPasswordInput, password);
    await this.clickWhenReady(LoginPageSelectors.loginBtn);
  }

  async startSignup(name: string, email: string) {
    await this.fillField(LoginPageSelectors.signupNameInput, name);
    await this.fillField(LoginPageSelectors.signupEmailInput, email);
    await this.clickWhenReady(LoginPageSelectors.signupBtn);
  }

  async getLoginErrorText(): Promise<string | null> {
    await this.waitForVisible(LoginPageSelectors.loginErrorMsg, 20_000);
    return this.getLocator(LoginPageSelectors.loginErrorMsg).textContent();
  }
}
