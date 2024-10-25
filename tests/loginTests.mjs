import BaseTest from './BaseTest.mjs'
import LoginPage from '../pages/LoginPage.mjs'
import ProductsPage from '../pages/productsPage.mjs'
import login from '../fixtures/login.json' assert { type: 'json'}


describe('Testar feature login', () => {

    let baseTest
    let loginPage
    let productsPage

    before(async () => {
        baseTest = new BaseTest()
        loginPage = new LoginPage(baseTest.driver)
        productsPage = new ProductsPage(baseTest.driver)        
    })

    after(async () => {
        await baseTest.quit()        
    })

    beforeEach(async () => {
        await loginPage.visit('/')
    })

    it('Realizar login com usuário standard', async () => {        
        await loginPage.login(login.standard, login.password)
        await productsPage.validatePageTitle()
        await productsPage.validatePageUrl()
    })

    it('Realizar login com usuário bloqueado', async () => {        
        await loginPage.login(login.locked, login.password)
        await loginPage.validateLockedUserMessage()
    })

    it('Realizar login com usuário com problema', async () => {        
        await loginPage.login(login.problem, login.password)
        await productsPage.validateWrongImage()
    })

    it('Realizar login com usuário com erros de performance', async () => {        
        await loginPage.login(login.performance, login.password)
        await productsPage.validateResponseTime()
    })

    it('Realizar login com usuário com erro de layout', async () => {        
        await loginPage.login(login.visual, login.password)
        await productsPage.validateLargeImage()
    })
})
