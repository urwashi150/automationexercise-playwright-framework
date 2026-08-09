import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Cart and Checkout', () => {
  test('adding a product updates the cart count @smoke', async ({ productsPage, cartPage }) => {
    await productsPage.open();
    await productsPage.addNthProductToCart(0);
    await productsPage.dismissContinueShoppingModal();

    await cartPage.open();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBeGreaterThanOrEqual(1);
  });

  test('adding multiple products reflects correct cart total @regression', async ({ productsPage, cartPage }) => {
    await productsPage.open();
    await productsPage.addNthProductToCart(0);
    await productsPage.dismissContinueShoppingModal();
    await productsPage.addNthProductToCart(1);
    await productsPage.dismissContinueShoppingModal();

    await cartPage.open();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);
  });

  test('checkout redirects guest users to register or login @regression', async ({ productsPage, cartPage, page }) => {
    await productsPage.open();
    await productsPage.addNthProductToCart(0);
    await productsPage.dismissContinueShoppingModal();

    await cartPage.open();
    await cartPage.proceedToCheckout();

    // automationexercise.com shows a modal prompting register/login for guests
    await expect(page.locator('u:has-text("Register / Login")')).toBeVisible();
  });
});
