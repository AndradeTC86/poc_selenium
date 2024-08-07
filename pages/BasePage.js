const seleniumFactory = require('./seleniumFactory')

class BasePage{
    static classPageTitle = 'title'

    constructor(driver = null, browser = null){
        this.driver = driver
        this.seleniumFactory = new SeleniumFactory(this.driver)
    }

    async initElements(){
        
    }
}

module.exports = BasePage
