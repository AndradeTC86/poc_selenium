import BaseTest from "./BaseTest.mjs"
import CheckoutOverviewPage from "../pages/checkoutOverviewPage.mjs"
import ProductsPage from "../pages/productsPage.mjs"
import CheckoutCompletePage from "../pages/checkoutCompletePage.mjs"
import { setCheckoutOverview } from "../commands/commands.mjs"

describe('Testar feature Checkout Overview', () => {
    let baseTest
    let checkoutOverviewPage
    let productsPage
    let checkoutCompletePage

    before(async () => {
        baseTest = new BaseTest()
        checkoutOverviewPage = new CheckoutOverviewPage(baseTest.driver)
        productsPage = new ProductsPage(baseTest.driver)
        checkoutCompletePage = new CheckoutCompletePage(baseTest.driver)
    })

    after(async () => {
        await baseTest.quit()
    })

    beforeEach(async () => {
        await setCheckoutOverview(baseTest.driver)
        await checkoutOverviewPage.validatePageTitle()
        await checkoutOverviewPage.validatePageUrl()
    })

    it('Botão cancelar deve voltar para a página de produtos', async () => {
        await checkoutOverviewPage.clickBtnCancel()
        await productsPage.validatePageTitle()
        await productsPage.validatePageUrl()
    })

    it('Botão continuar deve finalizar o pedido', async () => {
        await checkoutOverviewPage.clickBtnContinue()
        await checkoutCompletePage.validatePageTitle()
        await checkoutCompletePage.validatePageUrl()
        await checkoutCompletePage.validateHeaderMessage()
        await checkoutCompletePage.validateOrderMessage()
    })
})
