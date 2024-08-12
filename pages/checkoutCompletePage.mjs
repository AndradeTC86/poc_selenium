import BasePage from "./BasePage.mjs"
import { expect } from 'chai'

export default class CheckoutCompletePage extends BasePage {
    constructor(driver) {
        super(driver)
        this.lblTitle = '[data-test="title"]'
        this.btnBackHome = '[data-test="back-to-products"]'
        this.msgHeader = '.complete-header'
        this.msgOrder = '.complete-text'
    }

    async validatePageTitle() {
        const titleText = await this.getElementText(this.lblTitle)
        expect(titleText).to.equal("Checkout: Complete!")
    }

    async validatePageUrl() {
        const currentUrl = await this.getCurrentUrl()
        expect(currentUrl).to.include('/checkout-complete.html')
    }

    async validateHeaderMessage() {
        const headerText = await this.getElementText(this.msgHeader)
        expect(headerText).to.equal("Thank you for your order!")
    }

    async validateOrderMessage() {
        const orderText = await this.getElementText(this.msgOrder)
        expect(orderText).to.equal("Your order has been dispatched, and will arrive just as fast as the pony can get there!")
    }

    async clickBtnBackToHome() {
        await this.clickElement(this.btnBackHome)
    }
}
