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
  readonly titleMr: Locator;
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly offersCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountBtn: Locator;
  readonly accountCreatedMsg: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.titleMr = page.locator(SignupPageSelectors.titleMr);
    this.passwordInput = page.locator(SignupPageSelectors.passwordInput);
    this.daysSelect = page.locator(SignupPageSelectors.daysSelect);
    this.monthsSelect = page.locator(SignupPageSelectors.monthsSelect);
    this.yearsSelect = page.locator(SignupPageSelectors.yearsSelect);
    this.newsletterCheckbox = page.locator(SignupPageSelectors.newsletterCheckbox);
    this.offersCheckbox = page.locator(SignupPageSelectors.offersCheckbox);
    this.firstNameInput = page.locator(SignupPageSelectors.firstNameInput);
    this.lastNameInput = page.locator(SignupPageSelectors.lastNameInput);
    this.addressInput = page.locator(SignupPageSelectors.addressInput);
    this.countrySelect = page.locator(SignupPageSelectors.countrySelect);
    this.stateInput = page.locator(SignupPageSelectors.stateInput);
    this.cityInput = page.locator(SignupPageSelectors.cityInput);
    this.zipcodeInput = page.locator(SignupPageSelectors.zipcodeInput);
    this.mobileNumberInput = page.locator(SignupPageSelectors.mobileNumberInput);
    this.createAccountBtn = page.locator(SignupPageSelectors.createAccountBtn);
    this.accountCreatedMsg = page.locator(SignupPageSelectors.accountCreatedMsg);
    this.continueBtn = page.locator(SignupPageSelectors.continueBtn);
  }

  async fillAccountDetails(details: AccountDetails) {
    await this.clickWhenReady(this.titleMr);
    await this.fillField(this.passwordInput, details.password);
    await this.daysSelect.selectOption(details.day);
    await this.monthsSelect.selectOption(details.month);
    await this.yearsSelect.selectOption(details.year);

    if (details.newsletter) await this.newsletterCheckbox.check();
    if (details.offers) await this.offersCheckbox.check();

    await this.fillField(this.firstNameInput, details.firstName);
    await this.fillField(this.lastNameInput, details.lastName);
    await this.fillField(this.addressInput, details.address);
    await this.countrySelect.selectOption(details.country);
    await this.fillField(this.stateInput, details.state);
    await this.fillField(this.cityInput, details.city);
    await this.fillField(this.zipcodeInput, details.zipcode);
    await this.fillField(this.mobileNumberInput, details.mobileNumber);
  }

  async submitAccountCreation() {
    await this.clickWhenReady(this.createAccountBtn);
  }

  async continueAfterAccountCreated() {
    await this.clickWhenReady(this.continueBtn);
  }
}
