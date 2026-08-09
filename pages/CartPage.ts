import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartRows: Locator;
  readonly proceedToCheckoutBtn: Locator;
  readonly registerLoginLink: Locator;
  readonly commentTextArea: Locator;
  readonly placeOrderBtn: Locator;
  readonly cardNameInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cardCvcInput: Locator;
  readonly cardExpMonthInput: Locator;
  readonly cardExpYearInput: Locator;
  readonly payAndConfirmBtn: Locator;
  readonly orderSuccessMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.cartRows = page.locator('tbody tr');
    this.proceedToCheckoutBtn = page.locator('a:has-text("Proceed To Checkout")');
    this.registerLoginLink = page.locator('a[href="/login"]');
    this.commentTextArea = page.locator('textarea[name="message"]');
    this.placeOrderBtn = page.locator('a:has-text("Place Order")');
    this.cardNameInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cardCvcInput = page.locator('[data-qa="cvc"]');
    this.cardExpMonthInput = page.locator('[data-qa="expiry-month"]');
    this.cardExpYearInput = page.locator('[data-qa="expiry-year"]');
    this.payAndConfirmBtn = page.locator('[data-qa="pay-button"]');
    this.orderSuccessMsg = page.locator('h2:has-text("Order Placed!")');
  }

  async open() {
    await this.goto('/view_cart');
  }

  async getCartItemCount(): Promise<number> {
    return this.cartRows.count();
  }

  async proceedToCheckout() {
    await this.clickWhenReady(this.proceedToCheckoutBtn);
  }

  async addOrderComment(comment: string) {
    await this.fillField(this.commentTextArea, comment);
  }

  async placeOrder() {
    await this.clickWhenReady(this.placeOrderBtn);
  }

  async fillPaymentDetails(name: string, cardNumber: string, cvc: string, month: string, year: string) {
    await this.fillField(this.cardNameInput, name);
    await this.fillField(this.cardNumberInput, cardNumber);
    await this.fillField(this.cardCvcInput, cvc);
    await this.fillField(this.cardExpMonthInput, month);
    await this.fillField(this.cardExpYearInput, year);
  }

  async confirmPayment() {
    await this.clickWhenReady(this.payAndConfirmBtn);
  }
}
