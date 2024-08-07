const { Builder, By } = require('selenium-webdriver')

class BasePage{
    static classPageTitle = 'title'

    constructor(driver = null, browser = null){
        if (driver){
            this.driver = driver
        }
        else{
            switch (browser){
                case 'chrome':
                    this.driver = new Builder().forBrowser('chrome').build()
                    break
                case 'firefox':
                    this.driver = new Builder().forBrowser('firefox').build()
                    break
                case 'edge':
                    this.driver = new Builder().forBrowser('MicrosoftEdge').build()
                    break
                default:
                    throw new Error('Browser não suportado!')
            }
            this.driver.manage().window().maximize()
            this.driver.manage.setTimeouts({ implicit: 3000})
        }
    }

    async close(){
        await this.driver.quit()
    }

    async isUrlPage(url){
        const currentUrl = await this.driver.getCurrentUrl()
        return currentUrl === url
    }

    async hasPageTitle(titleText){
        const pageTitle = await this.driver.findElement(By.className(PageObject.caller)).getText()
        return pageTitle === titleText
    }

    async checkPage(url, titleText){
        return await this.isUrlPage(url) && await this.hasPageTitle(titleText)
    }

}

module.exports = BasePage