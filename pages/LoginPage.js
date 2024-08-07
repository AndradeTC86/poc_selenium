const { By, until } = require('selenium-webdriver')
const BasePage = require('./basePage')

class LoginPage extends BasePage{
  constructor(driver){
    super(driver)
    this.txtUserName = By.css('#user-name')
    this.txtPassword = By.css('#password')
    this.btnLogin = By.css('#login-button')
    this.msgLockedUser = By.css('[data-test=error]')
  }

  async goto(){
    await this.driver.get('/')
  }

  async login(username, password){
    await this.driver.findElement(this.txtUserName).sendKeys(username)
    await this.driver.findElement(this.txtPassword).sendkeys(password)
    await this.driver.findElement(this.btnLogin).click()
  }

  async validateLockedUserMessage(){
    const errorMessage = await this.driver.wait(until.elementLocated(this.msgLockedUser), 5000)
    const text = await errorMessage.getText()
    return text === 'Epic sadface: Sorry, this user has been locked out.'
  }
}

module.exports = LoginPage
