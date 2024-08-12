import BaseTest from "./BaseTest.mjs"
import ProductsPage from "../pages/productsPage.mjs"
import CheckoutCompletePage from "../pages/checkoutCompletePage.mjs"
import { setCheckoutComplete } from "../commands/commands.mjs"

describe('Testar feature Checkout Complete', () => {
    let baseTest
    let checkoutCompletePage
    let productsPage

    before(async () => {
        baseTest = new BaseTest()
        checkoutCompletePage = new CheckoutCompletePage(baseTest.driver)
        productsPage = new ProductsPage(baseTest.driver)
    })

    after(async () => {
        await baseTest.quit()
    })

    beforeEach(async () => {
        await setCheckoutComplete(baseTest.driver)
        await checkoutCompletePage.validatePageTitle()
        await checkoutCompletePage.validatePageUrl()
    })

    it('Clicar no botão voltar para home deve voltar a página de produtos', async () => {
        await checkoutCompletePage.clickBtnBackToHome()
        await productsPage.validatePageTitle()
        await productsPage.validatePageUrl()
    })
})
