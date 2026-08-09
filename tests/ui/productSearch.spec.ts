import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Product Search', () => {
  test('all products page lists items @smoke', async ({ productsPage }) => {
    await productsPage.open();
    await expect(productsPage.allProductsHeading).toBeVisible();

    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('searching for a known product returns matching results @regression', async ({ productsPage }) => {
    await productsPage.open();
    await productsPage.searchProduct('Dress');

    await expect(productsPage.searchedProductsHeading).toBeVisible();
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('searching for a nonsense term returns no results', async ({ productsPage }) => {
    await productsPage.open();
    await productsPage.searchProduct('zzz_nonexistent_product_zzz');

    await expect(productsPage.searchedProductsHeading).toBeVisible();
    const count = await productsPage.getProductCount();
    expect(count).toBe(0);
  });
});
