import { By, until } from "selenium-webdriver"

export default class BasePage{
    constructor(driver){
        this.driver = driver
        this.baseUrl = 'https://www.saucedemo.com'
    }

    async visit(path = '/'){
        await this.driver.get(`${this.baseUrl}${path}`)
    }

    async getElement(selector){
        return await this.driver.findElement(By.css(selector))
    }

    async clickElement(selector){
        const element = await this.getElement(selector)
        await element.click()
    }

    async enterText(selector, text){
        const element = await this.getElement(selector)
        await element.clear()
        await element.sendKeys(text)
    }

    async waitForElementVisible(selector, timeout = 10000){
        await this.driver.wait(until.elementLocated(By.css(selector)), timeout)
    }

    async getCurrentUrl(){
        return await this.driver.getCurrentUrl()
    }

    async getElementText(selector){
        const element = await this.getElement(selector)
        return await element.getText()
    }

    async isElementVisible(selector){
        const element = await this.getElement(selector)
        return await element.isDisplayed()
    }

    async getElementAttribute(selector, attribute){
        const element = await this.getElement(selector)
        return await element.getAttribute(attribute)
    }

    async getElementsText(selector){
        const elements = await this.driver.findElements(By.css(selector))
        const texts = await Promise.all(elements.map(async (element) => await element.getText()))
        return texts
    }
}