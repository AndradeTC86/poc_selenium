import BaseTest from "./BaseTest.mjs"
import ProductsPage from "../pages/productsPage.mjs"
import YourCartPage from "../pages/yourCartPage.mjs"
import { autoLogin } from "../commands/commands.mjs"

describe('Testar feature lista de produtos', () => {

    let baseTest
    let productsPage
    let yourCartPage

    before(async () => {
        baseTest = new BaseTest()
        productsPage = new ProductsPage(baseTest.driver)
        yourCartPage = new YourCartPage(baseTest.driver)
    })

    after(async () => {
        await baseTest.quit()        
    })

    beforeEach(async () => {
        await autoLogin(baseTest.driver)
        await productsPage.validatePageTitle()
        await productsPage.validatePageUrl()    
    })

    it('Inserir produto no carrinho e validar que foi gravado corretamente no carrinho', async () => {
        await productsPage.clickBtnAddtoCart()
        await productsPage.validateBdgShoppingCartNumber('1')
        await productsPage.clickBtnGoToCart()
        await yourCartPage.validateProductName()
    })

    it('Remover produto do carrinho pela página de produtos', async () => {
        await productsPage.clickBtnAddtoCart()
        await productsPage.validateBdgShoppingCartNumber('1')
        await productsPage.validateBtnRemoveFromCartVisible()
        await productsPage.clickBtnRemoveFromCart()
        await productsPage.validateBdgShoppingCartNotVisible()
        await productsPage.validateBtnAddToCartVisible()
    })

    it('Adicionar produto no carrinho pela página do produto e verificar que gravou corretamente no carrinho', async () => {
        await productsPage.clickImgProduct()
        await productsPage.clickBtnAddToCartFromProductPage()
        await productsPage.validateBdgShoppingCartNumber('1')
        await productsPage.clickBtnGoToCart()
        await yourCartPage.validateProductName()
    })

    it('Remover produto do carrinho pela página do produto e voltar a página de produtos', async () => {
        await productsPage.clickBtnAddtoCart()
        await productsPage.validateBdgShoppingCartNumber('1')
        await productsPage.clickImgProduct()
        await productsPage.validateBtnRemoveFromCartFromProductPageVisible()
        await productsPage.clickBtnRemoveFromCartFromProductPage()
        await productsPage.validateBdgShoppingCartNotVisible()
        await productsPage.validateBtnAddToCartFromProductPageVisible()
        await productsPage.clickLinkBackToProducts()
        await productsPage.validatePageTitle()
    })

    it('Validar adicionar e remover todos os produtos no carrinho', async () => {
        await productsPage.clickBtnAddToCartAllProducts()        
        await productsPage.validateBdgShoppingCartNumber('6')
        await productsPage.clickBtnRemoveFromCartAllProducts()
        await productsPage.validateBdgShoppingCartNotVisible()
    })

    it('Validar ordenação padrão em ordem alfabética crescente', async () => {
        await productsPage.validateSortedProductsAtoZ()
    })

    it('Ordenar produtos em ordem alfabética decrescente', async () => {
        await productsPage.orderByNameZtoA()
        await productsPage.validateSortedProductsZtoA()
    })

    it('Ordenar produtos em preço do menor para o maior', async () => {
        await productsPage.orderByPriceLowToHigh()
        await productsPage.validateSortedProductsLowToHigh()
    })

    it('Ordenar produtos em preço do maior para o menor', async () => {
        await productsPage.orderByPriceHighToLow()
        await productsPage.validateSortedProductsHighToLow()
    })
})