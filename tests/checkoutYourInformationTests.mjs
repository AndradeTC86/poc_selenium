import BaseTest from "./BaseTest.mjs"
import YourCartPage from "../pages/yourCartPage.mjs"
import CheckoutYourInformationPage from "../pages/checkoutYourInformationPage.mjs"
import CheckoutOverviewPage from "../pages/checkoutOverviewPage.mjs"
import { setCheckout } from "../commands/commands.mjs"
import cliente from '../fixtures/clientes.json' assert { type: 'json'}

describe('Testar feature Checkout Your Information', () => {
    let baseTest
    let yourCartPage
    let checkoutYourInfoPage
    let checkoutOverviewPage

    before(async () => {
        baseTest = new BaseTest()
        yourCartPage = new YourCartPage(baseTest.driver)
        checkoutYourInfoPage = new CheckoutYourInformationPage(baseTest.driver)
        checkoutOverviewPage = new CheckoutOverviewPage(baseTest.driver)
    })

    after(async () => {
        await baseTest.quit()
    })

    beforeEach(async () => {
        await setCheckout(baseTest.driver)
        await checkoutYourInfoPage.validatePageTitle()
        await checkoutYourInfoPage.validatePageUrl()
    })

    it('Clicar botão cancelar deve retornar ao carrinho e não salva as informações', async () => {
        await checkoutYourInfoPage.fillTextFields(cliente.firstName, cliente.lastName, cliente.zipCode)
        await checkoutYourInfoPage.clickBtnCancel()
        await yourCartPage.validatePageTitle()
        await yourCartPage.validatePageUrl()
        await yourCartPage.clickBtnCheckout()
        await checkoutYourInfoPage.validateTxtFirstNameEmpty()
        await checkoutYourInfoPage.validateTxtLastNameEmpty()
        await checkoutYourInfoPage.validateTxtZipCodeEmpty()
    })

    it('Validar preencher os campos de texto e clicar em continuar', async () => {
        await checkoutYourInfoPage.fillTextFields(cliente.firstName, cliente.lastName, cliente.zipCode)
        await checkoutYourInfoPage.clickBtnContinue()
        await checkoutOverviewPage.validatePageTitle()
        await checkoutOverviewPage.validatePageUrl()
    })

    it('Validar obrigatoriedade dos campos de texto', async () => {
        await checkoutYourInfoPage.clickBtnContinue()
        await checkoutYourInfoPage.validateFirstNameRequiredMessage()
        await checkoutYourInfoPage.fillTxtFirstName(cliente.firstName)
        await checkoutYourInfoPage.clickBtnContinue()
        await checkoutYourInfoPage.validateLastNameRequiredMessage()
        await checkoutYourInfoPage.fillTxtLastName(cliente.lastName)
        await checkoutYourInfoPage.clickBtnContinue()
        await checkoutYourInfoPage.validateZipCodeRequiredMessage()
    })
})