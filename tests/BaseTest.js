const { Builder } = require('selenium-webdriver')

class BaseTest{
  constructor(){
    this.driver = null
  }

  async setDriver(browser){
    this.driver = await new Builder().forBrowser(browser).build()
    await this.driver.manage().window().maximize()
  }

  async tearDown(){
    if (this.driver){
      await this.driver.quit()
    }
  }

  getDriver(){
    return this.driver
  }
}

module.exports = BaseTest
