import BasePage from "./BasePage.mjs"
import { expect } from "chai"

export default class CheckoutYourInformationPage extends BasePage{
    constructor(driver){
        super(driver)
        this.lblTitle = '[data-test="title"]'
        this.txtFirstName = '[data-test="firstName"]'
        this.txtLastName = '[data-test="lastName"]'
        this.txtZipCode = '[data-test="postalCode"]'
        this.btnCancel = '[data-test="cancel"]'
        this.btnContinue = '[data-test="continue"]'
        this.msgError = '.error-message-container'
    }

    async validatePageTitle() {
        const titleText = await this.getElementText(this.lblTitle)
        expect(titleText).to.equal("Checkout: Your Information")
    }

    async validatePageUrl() {
        const currentUrl = await this.getCurrentUrl()
        expect(currentUrl).to.include('/checkout-step-one.html')
    }

    async clickBtnCancel() {
        await this.clickElement(this.btnCancel)
    }

    async clickBtnContinue() {
        await this.clickElement(this.btnContinue)
    }

    async validateTxtFirstNameEmpty() {
        const isEmpty = await this.isElementEmpty(this.txtFirstName)
        expect(isEmpty).to.be.true
    }

    async validateTxtLastNameEmpty() {
        const isEmpty = await this.isElementEmpty(this.txtLastName)
        expect(isEmpty).to.be.true
    }

    async validateTxtZipCodeEmpty() {
        const isEmpty = await this.isElementEmpty(this.txtZipCode)
        expect(isEmpty).to.be.true
    }

    async fillTextFields(firstName, lastName, zipCode) {
        await this.fillElement(this.txtFirstName, firstName)
        await this.fillElement(this.txtLastName, lastName)
        await this.fillElement(this.txtZipCode, zipCode)
    }

    async validateFirstNameRequiredMessage() {
        const errorMessage = await this.getElementText(this.msgError)
        expect(errorMessage).to.equal('Error: First Name is required')
    }

    async validateLastNameRequiredMessage() {
        const errorMessage = await this.getElementText(this.msgError)
        expect(errorMessage).to.equal('Error: Last Name is required')
    }

    async validateZipCodeRequiredMessage() {
        const errorMessage = await this.getElementText(this.msgError)
        expect(errorMessage).to.equal('Error: Postal Code is required')
    }
}