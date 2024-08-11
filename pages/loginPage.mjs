import BasePage from "./BasePage.mjs"
import { By } from "selenium-webdriver"
import { expect } from 'chai'

export default class LoginPage extends BasePage{
    constructor(driver){
        super(driver)
        this.txtUserName = '#user-name'
        this.txtPassword = '#password'
        this.btnLogin = '#login-button'
        this.msgLockedUser = '[data-test="error"]'
    }

    async login(username, password){
        await this.enterText(this.txtUserName, username)
        await this.enterText(this.txtPassword, password)
        await this.clickElement(this.btnLogin)
    }

    async validateLockedUserMessage() {
        const errorMessage = await this.getElementText(this.msgLockedUser)
        expect(errorMessage).to.equal('Epic sadface: Sorry, this user has been locked out.')
    }
}