import LoginPage from '../pages/LoginPage.mjs'
import ProductsPage from '../pages/productsPage.mjs'
import YourCartPage from '../pages/yourCartPage.mjs'
import CheckoutYourInformationPage from '../pages/checkoutYourInformationPage.mjs'
import CheckoutOverviewPage from '../pages/checkoutOverviewPage.mjs'
import login from '../fixtures/login.json' assert { type: 'json' }
import cliente from '../fixtures/clientes.json' assert { type: 'json' }

export async function autoLogin(driver) {
  const loginPage = new LoginPage(driver)
  await loginPage.visit('/')
  await loginPage.login(login.standard, login.password)
}


export async function setCart(driver) {
  await autoLogin(driver)
  const productsPage = new ProductsPage(driver)
  await productsPage.clickBtnAddtoCart()
  await productsPage.validateBdgShoppingCartNumber('1')
  await productsPage.clickBtnGoToCart()
}

export async function setCheckout(driver) {
  await setCart(driver)
  const yourCartPage = new YourCartPage(driver)
  await yourCartPage.clickBtnCheckout()
}

export async function setCheckoutOverview(driver) {
  await setCheckout(driver)
  const checkoutYourInfoPage = new CheckoutYourInformationPage(driver)
  await checkoutYourInfoPage.fillTextFields(cliente.firstName, cliente.lastName, cliente.zipCode)
  await checkoutYourInfoPage.clickBtnContinue()
}

export async function setCheckoutComplete(driver) {
  await setCheckoutOverview(driver)
  const checkoutOverviewPage = new CheckoutOverviewPage(driver)
  await checkoutOverviewPage.clickBtnContinue()
}
