export const HomePageSelectors = {
  signupLoginLink: 'a[href="/login"]',
  logoutLink: 'a[href="/logout"]',
  deleteAccountLink: 'a[href="/delete_account"]',
  loggedInAsText: 'a:has-text("Logged in as")',
  productsLink: 'a[href="/products"]',
  cartLink: 'a[href="/view_cart"]',
  contactUsLink: 'a[href="/contact_us"]',
  subscriptionEmailInput: '#susbscribe_email',
  subscriptionSubmitBtn: '#subscribe',
  subscriptionSuccessMsg: '#success-subscribe',
};

export const LoginPageSelectors = {
  loginEmailInput: '[data-qa="login-email"]',
  loginPasswordInput: '[data-qa="login-password"]',
  loginBtn: '[data-qa="login-button"]',
  loginErrorMsg: 'p:has-text("Your email or password is incorrect!")',
  signupNameInput: '[data-qa="signup-name"]',
  signupEmailInput: '[data-qa="signup-email"]',
  signupBtn: '[data-qa="signup-button"]',
  signupErrorMsg: 'p:has-text("Email Address already exist!")',
};

export const ProductsPageSelectors = {
  allProductsHeading: 'h2:has-text("All Products")',
  searchInput: '#search_product',
  searchBtn: '#submit_search',
  searchedProductsHeading: 'h2:has-text("Searched Products")',
  productItems: '.product-image-wrapper',
  addToCartBtn: '.product-image-wrapper .add-to-cart',
  continueShoppingBtn: 'button:has-text("Continue Shopping")',
  viewCartLink: 'a[href="/view_cart"]',
};

export const CartPageSelectors = {
  cartRows: 'tbody tr',
  proceedToCheckoutBtn: 'a:has-text("Proceed To Checkout")',
  registerLoginLink: 'a[href="/login"]',
  commentTextArea: 'textarea[name="message"]',
  placeOrderBtn: 'a:has-text("Place Order")',
  cardNameInput: '[data-qa="name-on-card"]',
  cardNumberInput: '[data-qa="card-number"]',
  cardCvcInput: '[data-qa="cvc"]',
  cardExpMonthInput: '[data-qa="expiry-month"]',
  cardExpYearInput: '[data-qa="expiry-year"]',
  payAndConfirmBtn: '[data-qa="pay-button"]',
  orderSuccessMsg: 'h2:has-text("Order Placed!")',
};

export const SignupPageSelectors = {
  titleMr: '#id_gender1',
  passwordInput: '#password',
  daysSelect: '#days',
  monthsSelect: '#months',
  yearsSelect: '#years',
  newsletterCheckbox: '#newsletter',
  offersCheckbox: '#optin',
  firstNameInput: '#first_name',
  lastNameInput: '#last_name',
  addressInput: '#address1',
  countrySelect: '#country',
  stateInput: '#state',
  cityInput: '#city',
  zipcodeInput: '#zipcode',
  mobileNumberInput: '#mobile_number',
  createAccountBtn: '[data-qa="create-account"]',
  accountCreatedMsg: '[data-qa="account-created"]',
  continueBtn: '[data-qa="continue-button"]',
};
