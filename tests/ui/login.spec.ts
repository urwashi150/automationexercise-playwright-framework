import { test, expect } from '../../fixtures/pageFixtures';
import { ENV } from '../../config/env.config';

test.describe('User Login', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('login fails with invalid credentials @regression', async ({ homePage, loginPage }) => {
    await homePage.goToSignupLogin();
    await loginPage.login('nonexistent_user@example.com', 'WrongPassword123');

    const errorText = await loginPage.getLoginErrorText();
    expect(errorText).toContain('incorrect');
  });

  test('registered user can log in successfully @smoke', async ({ homePage, loginPage }) => {
    test.skip(!ENV.TEST_USER_EMAIL, 'Set TEST_USER_EMAIL / TEST_USER_PASSWORD in .env to run this test');

    await homePage.goToSignupLogin();
    await loginPage.login(ENV.TEST_USER_EMAIL, ENV.TEST_USER_PASSWORD);

    const loggedIn = await homePage.loggedInAsText.isVisible();
    expect(loggedIn).toBeTruthy();
  });
});
