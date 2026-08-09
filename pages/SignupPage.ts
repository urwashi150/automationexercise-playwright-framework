import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { SignupPageSelectors } from './selectors';

export interface AccountDetails {
  password: string;
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
  newsletter?: boolean;
  offers?: boolean;
}

export class SignupPage extends BasePage {
  async fillAccountDetails(details: AccountDetails) {
    await this.clickWhenReady(SignupPageSelectors.titleMr);
    await this.fillField(SignupPageSelectors.passwordInput, details.password);
    await this.getLocator(SignupPageSelectors.daysSelect).selectOption(details.day);
    await this.getLocator(SignupPageSelectors.monthsSelect).selectOption(details.month);
    await this.getLocator(SignupPageSelectors.yearsSelect).selectOption(details.year);

    if (details.newsletter) await this.getLocator(SignupPageSelectors.newsletterCheckbox).check();
    if (details.offers) await this.getLocator(SignupPageSelectors.offersCheckbox).check();

    await this.fillField(SignupPageSelectors.firstNameInput, details.firstName);
    await this.fillField(SignupPageSelectors.lastNameInput, details.lastName);
    await this.fillField(SignupPageSelectors.addressInput, details.address);
    await this.getLocator(SignupPageSelectors.countrySelect).selectOption(details.country);
    await this.fillField(SignupPageSelectors.stateInput, details.state);
    await this.fillField(SignupPageSelectors.cityInput, details.city);
    await this.fillField(SignupPageSelectors.zipcodeInput, details.zipcode);
    await this.fillField(SignupPageSelectors.mobileNumberInput, details.mobileNumber);
  }

  async submitAccountCreation() {
    await this.clickWhenReady(SignupPageSelectors.createAccountBtn);
  }

  async continueAfterAccountCreated() {
    await this.clickWhenReady(SignupPageSelectors.continueBtn);
  }
}
