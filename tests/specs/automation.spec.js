import { expect, test } from '@playwright/test';
import HomePage from '../pages/homepage.js';
import ProductsPage from '../pages/productspage.js';
import ProductDetailsPage from '../pages/productdetailpage.js';

test('Automation Exercise - Products Flow', async ({ page }) => {
    const home = new HomePage(page);
    const products = new ProductsPage(page);
    const details = new ProductDetailsPage(page);

    await home.navigate();
    console.log('Navigation to the HomePage');

    await home.navigateToProducts();
    console.log('Clicking Products link...');

    await expect(page).toHaveURL(/\/products/);
    console.log('Naviagted to Product URL');

    //await products.verifyProductsPageLoaded();
    await products.verifyProductsPageLoaded();
    console.log('All products heading is visible');

    const searchTerm = 'Blue Top';
    await products.searchProduct(searchTerm);
    console.log('Search results are visible');

    const names = await products.searchResults.allTextContents();
    console.log('Search Results:', names);

    for (const name of names) {
        console.log(`Validating: "${name}" contains "${searchTerm}"`);
        const match = name.toLowerCase().includes(searchTerm.toLowerCase());
        expect(match).toBe(true); // Playwright-style assertion
        if (!match) {
            throw new Error(`"${name}" does not match search term "${searchTerm}"`);
        }
    }

    await products.addFirstProductToCart();
    console.log('Hovered on First Product');
    console.log('Adding first product to cart...');
    console.log('First product added to cart.');

    await products.viewFirstProductDetails();
    console.log('Viewing product details...');
    expect(page.url()).toMatch(/\/product_details\//);
    console.log('Navigated to Product details page');

    await details.verifyDetailsVisible();
    console.log('Verifying product details...');
    expect(await details.name.isVisible()).toBe(true);
    expect(await details.category.isVisible()).toBe(true);
    expect(await details.price.isVisible()).toBe(true);
    expect(await details.availability.isVisible()).toBe(true);


    console.log('Product details are visible: Name, Category, Price, Availability');

    await page.getByRole('link', { name: 'Website for automation' }).click();
    console.log('Clicked on Website for automation link');
    expect(page.url()).toBe('https://automationexercise.com/');
    console.log('Navigated back to HomePage');

});