const BasePage = require('./basePage')
const { By } = require('selenium-webdriver')

class LoginPage extends BasePage {
    constructor(driver) {
        super(driver)
        this.usernameField = By.id('user-name')
        this.passwordField = By.id('password')
        this.loginButton = By.id('login-button')
    }

    async enterUsername(username) {
        await this.typeIntoField(this.usernameField, username)
    }

    async enterPassword(password) {
        await this.typeIntoField(this.passwordField, password)
    }

    async clickLoginButton() {
        await this.clickElement(this.loginButton)
    }

    async login(username, password) {
        await this.enterUsername(username)
        await this.enterPassword(password)
        await this.clickLoginButton()
    }
}

module.exports = LoginPage
