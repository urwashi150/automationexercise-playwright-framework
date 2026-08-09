import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { ApiClient } from '../utils/apiClient';
import { ENV } from '../config/env.config';

/**
 * Extends the base Playwright `test` object with page objects and an API
 * client already instantiated, so spec files never construct these
 * themselves. This keeps test files focused on behavior, not setup.
 */
type Fixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  apiClient: ApiClient;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request, ENV.API_BASE_URL.replace(ENV.BASE_URL, '')));
  },
});

export { expect } from '@playwright/test';
