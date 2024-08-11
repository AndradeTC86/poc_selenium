import { Builder } from 'selenium-webdriver'

class BaseTest{
    constructor(){
        this.driver = new Builder().forBrowser('chrome').build()        
    }

    async navigateTo(url){
        await this.driver.get(url)
    }

    async quit(){
        await this.driver.quit()
    }
}

export default BaseTest