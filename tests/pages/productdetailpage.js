 class ProductDetailsPage {
  constructor(page) {
    this.page = page;

  this.name = page.locator('.product-information h2');
  this.category = page.locator('.product-information p:has-text("Category")');
  this.price = page.locator('.product-information span').nth(0);
  this.availability = page.locator('.product-information p:has-text("Availability")');
  }
  async verifyDetailsVisible() {
    await Promise.all([
      this.name.waitFor({ state: 'visible' }),
      this.category.waitFor({ state: 'visible' }),
      this.price.waitFor({ state: 'visible' }),
      this.availability.waitFor({ state: 'visible' }),
    ]);
  }
}
module.exports = ProductDetailsPage;
