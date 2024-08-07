const { expect } = require('chai')
const BaseTest = require('../baseTest')
const LoginPage = require('../page_objects/loginPage')
const login = require('../fixtures/users.json')

class LoginTest extends BaseTest {
    async before() {
        await super.before();
        this.loginPage = new LoginPage(this.driver)
        this.homePage = new HomePage(this.driver)
    }

    async after() {
        await super.after()
    }

    async run() {
        describe('SauceDemo Login Test', function() {
            it('should login with valid credentials', async function() {
                await this.loginPage.navigate(process.env.BASE_URL)
                await this.loginPage.login(login.standard, login.password)
                const isLoaded = await this.homePage.isLoaded()
                expect(isLoaded).to.be.true
            })
        })
    }
}

const test = new LoginTest()
test.before().then(() => test.run().then(() => test.after()))

