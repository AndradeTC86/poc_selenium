import BasePage from "./BasePage.mjs"
import { expect } from 'chai'
import { By, Select } from 'selenium-webdriver'
import axios from 'axios'
import produto from '../fixtures/produtos.json' assert { type : 'json'}

export default class ProductsPage extends BasePage{
    constructor(driver){
        super(driver)
        this.lblTitle = '[data-test="title"]'
        this.imgProduct = '[data-test="inventory-item-sauce-labs-backpack-img"]'
        this.btnCart = '[data-test="shopping-cart-link"]'
        this.bdgShoppingCart = '.shopping_cart_badge'
        this.lnkBackToProducts = '[data-test="back-to-products"]'
        this.menuOrdenar = '[data-test="product-sort-container"]'
        this.btnAddToCart = '[data-test="add-to-cart"]'
        this.btnRemoveFromCart = '[data-test="remove"]'
        this.lblItemName = '.inventory_item_name'
        this.lblItemPrice = '.inventory_item_price'
    }

    async validatePageTitle(){
        const titleText = await this.getElementText(this.lblTitle)
        expect(titleText).to.equal("Products")
    }

    async validatePageUrl(){
        const currentUrl = await this.getCurrentUrl()
        expect(currentUrl).to.include('/inventory.html')
    }

    getBtnAddToCart(produto){        
        return `[data-test="add-to-cart-${produto}"]`
    }

    getBtnRemoveFromCart(produto){        
        return `[data-test=remove-${produto}]`
    }

    async clickBtnAddtoCart(){
        await this.clickElement(this.getBtnAddToCart(produto[0].produto))
    }

    async clickBtnRemoveFromCart(){
        await this.clickElement(this.getBtnRemoveFromCart(produto[0].produto))
    }

    async clickBtnAddToCartFromProductPage(){
        await this.clickElement(this.btnAddToCart)
    }

    async clickBtnRemoveFromCartFromProductPage(){
        await this.clickElement(this.btnRemoveFromCart)
    }

    async clickBtnAddToCartAllProducts(){
        for (const produtos of produto){
            await this.clickElement(this.getBtnAddToCart(produtos.produto))
        }    
    }

    async clickBtnRemoveFromCartAllProducts(){
        for (const produtos of produto){
            await this.clickElement(this.getBtnRemoveFromCart(produtos.produto))
        }
    }

    async clickBtnGoToCart(){
        await this.clickElement(this.btnCart)
    }

    async clickLinkBackToProducts(){
        await this.clickElement(this.lnkBackToProducts)
    }

    async clickImgProduct(){
        await this.clickElement(this.imgProduct)
    }

    async orderByNameZtoA(){
        const menuOrdenar = await this.driver.findElement(By.css(this.menuOrdenar))
        const select = new Select(menuOrdenar)                
        await select.selectByVisibleText('Name (Z to A)')
    }

    async orderByPriceLowToHigh(){
        const menuOrdenar = await this.driver.findElement(By.css(this.menuOrdenar))
        const select = new Select(menuOrdenar)                
        await select.selectByVisibleText('Price (low to high)')
    }

    async orderByPriceHighToLow(){
        const menuOrdenar = await this.driver.findElement(By.css(this.menuOrdenar))
        const select = new Select(menuOrdenar)                
        await select.selectByVisibleText('Price (high to low)')
    }

    async validateBdgShoppingCartNumber(number){
        const badgeText = await this.getElementText(this.bdgShoppingCart)
        expect(badgeText).to.equal(number)
    }

    async validateBdgShoppingCartNotVisible(){
        try {
            const isVisible = await this.isElementVisible(this.bdgShoppingCart);
            expect(isVisible).to.be.false;
        } catch (error) {
            if (error.name === 'NoSuchElementError') {
                return
            }
            throw error
        }
    }

    async validateBtnAddToCartFromProductPageVisible(){
        const isVisible = await this.isElementVisible(this.btnAddToCart)
        expect(isVisible).to.be.true
    }

    async validateBtnRemoveFromCartFromProductPageVisible(){
        const isVisible = await this.isElementVisible(this.btnRemoveFromCart)
        expect(isVisible).to.be.true
    }

    async validateBtnAddToCartVisible(){
        const isVisible = await this.isElementVisible(this.getBtnAddToCart(produto[0].produto))
        expect(isVisible).to.be.true
    }

    async validateBtnRemoveFromCartVisible(){
        const isVisible = await this.isElementVisible(this.getBtnRemoveFromCart(produto[0].produto))
        expect(isVisible).to.be.true
    }

    async validateWrongImage(){
        const imgSrc = await this.getElementAttribute(this.imgProduct, 'src')
        expect(imgSrc).to.equal("https://www.saucedemo.com/static/media/sl-404.168b1cce.jpg")
    }

    async validateLargeImage(){
        const img = await this.getElement(this.imgProduct)
        const boundingBox = await img.getRect()
        const width = Math.round(boundingBox.width)
        const height = Math.round(boundingBox.height)
        expect(width).to.equal(262)
        expect(height).to.equal(238)
    }

    async validateSortedProductsAtoZ(){
        const items = await this.getElementsText(this.lblItemName)
        const sortedItems = [...items].sort()
        expect(items).to.deep.equal(sortedItems)
    }

    async validateSortedProductsZtoA(){
        const items = await this.getElementsText(this.lblItemName)
        const sortedItems = [...items].sort().reverse()
        expect(items).to.deep.equal(sortedItems)
    }

    async validateSortedProductsLowToHigh(){
        const items = await this.getElementsText(this.lblItemPrice)
        const prices = items.map(item => parseFloat(item.replace('$', "")))
        const sortedPrices = [...prices].sort((a,b) => a - b)
        expect(prices).to.deep.equal(sortedPrices)
    }

    async validateSortedProductsHighToLow(){
        const items = await this.getElementsText(this.lblItemPrice)
        const prices = items.map(item => parseFloat(item.replace('$', "")))
        const sortedPrices = [...prices].sort((a,b) => b - a)
        expect(prices).to.deep.equal(sortedPrices)
    }

    async validateResponseTime(){
        const startTime = Date.now()
        try{
            await axios.post(
                'https://events.backtrace.io/api/unique-events/submit?universe=UNIVERSE&token=TOKEN',
                {},
                {
                  validateStatus: function (status) {
                    return status < 500
                  },
                }
              )
            const endTime = Date.now()
            const responseDuration = endTime - startTime
            expect(responseDuration).to.be.greaterThan(400)
        } catch(error){
            throw new Error('Erro ao fazer a requisição: ' + error.message)
        }
    }
} 