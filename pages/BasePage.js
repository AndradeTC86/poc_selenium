class BasePage{
    static classPageTitle = 'title'

    constructor(driver = null, browser = null){
        this.driver = driver        
    }

    async navigate(url) {
        await this.driver.get(url);
    }

    async findElement(selector) {
        return this.driver.findElement(selector);
    }

    async clickElement(selector) {
        await this.findElement(selector).click();
    }

    async typeIntoField(selector, text) {
        await this.findElement(selector).sendKeys(text);
    }
}

module.exports = BasePage
