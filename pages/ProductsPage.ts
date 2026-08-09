import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly allProductsHeading: Locator;
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly searchedProductsHeading: Locator;
  readonly productItems: Locator;
  readonly firstAddToCartBtn: Locator;
  readonly continueShoppingBtn: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.allProductsHeading = page.locator('h2:has-text("All Products")');
    this.searchInput = page.locator('#search_product');
    this.searchBtn = page.locator('#submit_search');
    this.searchedProductsHeading = page.locator('h2:has-text("Searched Products")');
    this.productItems = page.locator('.product-image-wrapper');
    this.firstAddToCartBtn = page.locator('.product-image-wrapper .add-to-cart').first();
    this.continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');
    this.viewCartLink = page.locator('a[href="/view_cart"]');
  }

  async open() {
    await this.goto('/products');
  }

  async searchProduct(name: string) {
    await this.fillField(this.searchInput, name);
    await this.clickWhenReady(this.searchBtn);
  }

  async getProductCount(): Promise<number> {
    return this.productItems.count();
  }

  async addNthProductToCart(index: number) {
    const addBtn = this.page.locator('.product-image-wrapper .add-to-cart').nth(index);
    await this.scrollToElement(addBtn);
    await addBtn.click({ force: true });
  }

  async dismissContinueShoppingModal() {
    if (await this.continueShoppingBtn.isVisible().catch(() => false)) {
      await this.continueShoppingBtn.click();
    }
  }

  async goToCartFromModal() {
    await this.clickWhenReady(this.viewCartLink);
  }
}
