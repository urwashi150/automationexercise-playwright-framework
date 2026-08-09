import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductsPageSelectors } from './selectors';

export class ProductsPage extends BasePage {
  get allProductsHeading(): Locator {
    return this.getLocator(ProductsPageSelectors.allProductsHeading);
  }

  get searchedProductsHeading(): Locator {
    return this.getLocator(ProductsPageSelectors.searchedProductsHeading);
  }

  async open() {
    await this.goto('/products');
  }

  async searchProduct(name: string) {
    await this.fillField(ProductsPageSelectors.searchInput, name);
    await this.clickWhenReady(ProductsPageSelectors.searchBtn);
  }

  async getProductCount(): Promise<number> {
    return this.getLocator(ProductsPageSelectors.productItems).count();
  }

  async addNthProductToCart(index: number) {
    const addBtn = this.getLocator(ProductsPageSelectors.addToCartBtn).nth(index);
    await this.scrollToElement(addBtn);
    await addBtn.click({ force: true });
  }

  async dismissContinueShoppingModal() {
    const continueBtn = this.getLocator(ProductsPageSelectors.continueShoppingBtn);
    if (await continueBtn.isVisible().catch(() => false)) {
      await continueBtn.click();
    }
  }

  async goToCartFromModal() {
    await this.clickWhenReady(ProductsPageSelectors.viewCartLink);
  }
}
