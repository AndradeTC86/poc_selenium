import BasePage from "./BasePage.mjs"
import { expect } from 'chai'

export default class CheckoutOverviewPage extends BasePage {
    constructor(driver) {
        super(driver)
        this.lblTitle = '[data-test="title"]'
        this.btnCancel = '[data-test="cancel"]'
        this.btnContinue = '[data-test="finish"]'
    }

    async validatePageTitle() {
        const titleText = await this.getElementText(this.lblTitle)
        expect(titleText).to.equal("Checkout: Overview")
    }

    async validatePageUrl() {
        const currentUrl = await this.getCurrentUrl()
        expect(currentUrl).to.include('/checkout-step-two.html')
    }

    async clickBtnCancel() {
        await this.clickElement(this.btnCancel)
    }

    async clickBtnContinue() {
        await this.clickElement(this.btnContinue)
    }
}
