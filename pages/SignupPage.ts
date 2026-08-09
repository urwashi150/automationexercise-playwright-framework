import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

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
    this.titleMr = page.locator('#id_gender1');
    this.passwordInput = page.locator('#password');
    this.daysSelect = page.locator('#days');
    this.monthsSelect = page.locator('#months');
    this.yearsSelect = page.locator('#years');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.offersCheckbox = page.locator('#optin');
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.addressInput = page.locator('#address1');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');
    this.createAccountBtn = page.locator('[data-qa="create-account"]');
    this.accountCreatedMsg = page.locator('[data-qa="account-created"]');
    this.continueBtn = page.locator('[data-qa="continue-button"]');
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
