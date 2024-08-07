const { expect } = require('chai')
const BaseTest = require('./baseTest')
const LoginPage = require('../pages/loginPage')
const baseTest = new BaseTest()
const login = require('../fixtures/login.json')

describe('Login Page Test', function() {
  this.timeout(15000)

  it('should navigate to the login page and validate locked user message', async function() {
    const driver = baseTest.getDriver()
    const loginPage = new LoginPage(driver)

    await loginPage.goto()
    await loginPage.login(login.locked, login.password)
    const messageIsCorrect = await loginPage.validateLockedUserMessage()
    
    expect(messageIsCorrect).to.be.true;
  })
})
