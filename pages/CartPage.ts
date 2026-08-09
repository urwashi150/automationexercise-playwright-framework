import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartPageSelectors } from './selectors';

export class CartPage extends BasePage {
  get proceedToCheckoutBtn(): Locator {
    return this.getLocator(CartPageSelectors.proceedToCheckoutBtn);
  }

  get registerLoginLink(): Locator {
    return this.getLocator(CartPageSelectors.registerLoginLink);
  }

  get commentTextArea(): Locator {
    return this.getLocator(CartPageSelectors.commentTextArea);
  }

  get placeOrderBtn(): Locator {
    return this.getLocator(CartPageSelectors.placeOrderBtn);
  }

  get cardNameInput(): Locator {
    return this.getLocator(CartPageSelectors.cardNameInput);
  }

  get cardNumberInput(): Locator {
    return this.getLocator(CartPageSelectors.cardNumberInput);
  }

  get cardCvcInput(): Locator {
    return this.getLocator(CartPageSelectors.cardCvcInput);
  }

  get cardExpMonthInput(): Locator {
    return this.getLocator(CartPageSelectors.cardExpMonthInput);
  }

  get cardExpYearInput(): Locator {
    return this.getLocator(CartPageSelectors.cardExpYearInput);
  }

  get payAndConfirmBtn(): Locator {
    return this.getLocator(CartPageSelectors.payAndConfirmBtn);
  }

  get orderSuccessMsg(): Locator {
    return this.getLocator(CartPageSelectors.orderSuccessMsg);
  }

  async open() {
    await this.goto('/view_cart');
  }

  async getCartItemCount(): Promise<number> {
    return this.getLocator(CartPageSelectors.cartRows).count();
  }

  async proceedToCheckout() {
    await this.clickWhenReady(CartPageSelectors.proceedToCheckoutBtn);
  }

  async addOrderComment(comment: string) {
    await this.fillField(CartPageSelectors.commentTextArea, comment);
  }

  async placeOrder() {
    await this.clickWhenReady(CartPageSelectors.placeOrderBtn);
  }

  async fillPaymentDetails(name: string, cardNumber: string, cvc: string, month: string, year: string) {
    await this.fillField(CartPageSelectors.cardNameInput, name);
    await this.fillField(CartPageSelectors.cardNumberInput, cardNumber);
    await this.fillField(CartPageSelectors.cardCvcInput, cvc);
    await this.fillField(CartPageSelectors.cardExpMonthInput, month);
    await this.fillField(CartPageSelectors.cardExpYearInput, year);
  }

  async confirmPayment() {
    await this.clickWhenReady(CartPageSelectors.payAndConfirmBtn);
  }
}
