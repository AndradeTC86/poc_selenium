const BaseTest = require('./baseTest')
const baseTest = new BaseTest()

beforeEach(async function() {
  const browser = process.env.BROWSER || 'chrome'
  await baseTest.setDriver(browser)
})

afterEach(async function() {
  await baseTest.tearDown()
})

