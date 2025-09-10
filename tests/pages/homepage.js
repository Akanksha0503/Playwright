class HomePage {
  constructor(page) {
    this.page = page;
    this.productsLink = page.locator('a[href="/products"]');
  }

 async navigate() {
await this.page.goto('https://automationexercise.com/');
await this.page.waitForLoadState('networkidle');
 }
  async navigateToProducts() {
    await this.productsLink.click();
  }
}
module.exports = HomePage;