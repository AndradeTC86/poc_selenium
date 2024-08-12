import BaseTest from "./BaseTest.mjs"
import ProductsPage from "../pages/productsPage.mjs"
import YourCartPage from "../pages/yourCartPage.mjs"
import CheckoutYourInformationPage from "../pages/checkoutYourInformationPage.mjs" 
import { setCart } from "../commands/commands.mjs"

describe('Testar feature Your Cart', () => {
    let baseTest
    let productsPage
    let yourCartPage
    let checkoutYourInfoPage

    before(async () => {
        baseTest = new BaseTest()
        productsPage = new ProductsPage(baseTest.driver)
        yourCartPage = new YourCartPage(baseTest.driver)
        checkoutYourInfoPage = new CheckoutYourInformationPage(baseTest.driver)
    })

    after(async () => {
        await baseTest.quit()
    })

    beforeEach(async () => {
        await setCart(baseTest.driver)        
        await yourCartPage.validatePageTitle()
        await yourCartPage.validatePageUrl()
    })

    it('Validar botão continuar comprando', async () => {
        await yourCartPage.clickBtnContinueShopping()
        await productsPage.validatePageTitle()
    })

    it('Validar botão remover produto', async () => {
        await yourCartPage.clickBtnRemoveFromCart()
        await yourCartPage.validateProductNameNotVisible()
    })

    it('Validar botão checkout', async () => {
        await yourCartPage.clickBtnCheckout()
        await checkoutYourInfoPage.validatePageTitle()
    })
})