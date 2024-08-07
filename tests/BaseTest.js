const { Builder } = require('selenium-webdriver')
require('dotenv').config()

class BaseTest {
    constructor() {
        this.driver = null
    }

    async before() {
        this.driver = await new Builder().forBrowser('chrome').build()
    }

    async after() {
        if (this.driver) {
            await this.driver.quit()
        }
    }
}

module.exports = BaseTest
