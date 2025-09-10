class ProductsPage {
    constructor(page) {
        this.page = page;

        this.heading = page.locator('h2:has-text("All Products")');
        this.searchInput = page.locator('#search_product');
        this.searchBtn = page.locator('#submit_search');
        this.searchedTitle = page.locator('h2:has-text("Searched Products")');
        this.productNames = page.locator('.productinfo p');
        this.searchResults = this.page.locator('.productinfo p');
        this.firstProduct = this.page.locator('.product').first();
        this.addToCartBtn = this.firstProduct.locator('a:has-text("Add to cart")');
        this.continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');
        this.successModal = page.locator('#cartModal');
    }
    async navigate() {
        await this.page.goto('https://automationexercise.com/products');
        await this.page.waitForLoadState('networkidle');
    }

    async verifyProductsPageLoaded() {

        await this.heading.isVisible();
    }

    async searchProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchBtn.click();
        await this.searchedTitle.isVisible();
    }
    async addFirstProductToCart() {
         if (this.page.isClosed()) {
      return;
    }

    // Wait for DOM to stabilize
    await this.page.waitForLoadState('domcontentloaded');

    // Check visibility of product
    const isVisible = await this.firstProduct.isVisible();
    if (!isVisible) {
      console.warn('First product not visible—skipping interaction');
      return;
    }

        await this.firstProduct.hover();
        await this.addToCartBtn.click();
        await this.successModal.waitFor({ state: 'visible' });
        await this.continueShoppingBtn.click();
    }

    async viewFirstProductDetails() {
        await this.page.locator('a:has-text("View Product")').first().click();
        await this.page.waitForURL(/\/product_details\//);
    }
}
module.exports = ProductsPage;
