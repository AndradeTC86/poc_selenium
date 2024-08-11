import BasePage from "./BasePage.mjs"
import { expect } from 'chai'
import produto from '../fixtures/produtos.json' assert { type : 'json'}

export default class YourCartPage extends BasePage{
    constructor(driver){
        super(driver)
        this.lblTitle = '[data-test="cart-title]'
        this.lblItemName = '[data-test="inventory-item-name"]'
        this.btnCheckout = '[data-test="checkout"]'
        this.btnContinueShopping = '[data-test="continue-shopping"]'
    }

    async validatePageTitle(){
        const titleText = await this.getElementText(this.lblTitle)
        expect(titleText).to.equal("Your Cart")
    }

    async validatePageUrl(){
        const currentUrl = await this.getCurrentUrl()
        expect(currentUrl).to.include('/cart.html')
    }

    async validateProductName(){
        const itemName = await this.getElementText(this.lblItemName)
        expect(itemName).to.equal(produto[0].name)
    }

    async validateProductNameNotVisible(){
        const isVisible = await this.isElementVisible(this.lblItemName)
        expect(isVisible).to.be.false
    }

    async clickBtnContinueShopping(){
        await this.clickElement(this.btnContinueShopping)
    }

    async clickBtnCheckout(){
        await this.clickElement(this.btnCheckout)
    }

    getBtnRemoveFromCart(produto){
        return `[data-test="remove-${produto}"]`
    }

    async clickBtnRemoveFromCart(){
        await this.clickElement(this.getBtnRemoveFromCart(produto[0].produto))
    }
}