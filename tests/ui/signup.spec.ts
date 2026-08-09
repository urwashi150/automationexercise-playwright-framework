import { SignupPageSelectors } from '@pages/selectors';
import { test, expect } from '../../fixtures/pageFixtures';
import { TestDataGenerator } from '../../utils/testDataGenerator';

test.describe('User Registration', () => {
  test('new user can sign up with a unique email @smoke', async ({ homePage, loginPage, signupPage, page }) => {
    const name = TestDataGenerator.randomName();
    const email = TestDataGenerator.randomEmail();

    await homePage.open();
    await homePage.goToSignupLogin();

    await loginPage.startSignup(name, email);
    await expect(page).toHaveURL(/signup/);

    await signupPage.fillAccountDetails({
      password: TestDataGenerator.strongPassword(),
      day: '10',
      month: '5',
      year: '1995',
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1],
      address: '221B Baker Street',
      country: 'India',
      state: 'Maharashtra',
      city: 'Pune',
      zipcode: TestDataGenerator.randomZip(),
      mobileNumber: TestDataGenerator.randomMobile(),
      newsletter: true,
    });

    await signupPage.submitAccountCreation();
    await expect(page.locator(SignupPageSelectors.accountCreatedMsg)).toBeVisible();

    await signupPage.continueAfterAccountCreated();
    const loggedIn = await homePage.isLoggedInAs(name);
    expect(loggedIn).toBeTruthy();
  });

  test('signup fails gracefully with an already-registered email', async ({ homePage, loginPage, page }) => {
    // Uses a stable seeded email; replace with a known existing account
    // on the target environment, or seed one via the API layer first.
    const existingEmail = 'urwashi123patidar@gmail.com';

    await homePage.open();
    await homePage.goToSignupLogin();
    await loginPage.startSignup(TestDataGenerator.randomName(), existingEmail);
    await expect(page).toHaveURL(/signup/);

    // automationexercise.com stays on /login and shows an inline error
    // when the email is already registered.
    const errorVisible = await loginPage.signupErrorMsg.isVisible().catch(() => false);
    expect(errorVisible || page.url().includes('login')).toBeTruthy();
    await expect(loginPage.signupErrorMsg).toHaveText('Email Address already exist!');
  });
});
