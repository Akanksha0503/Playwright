const { chromium } = require('playwright');
async function ecommerceExample() {
console.log('�� Starting e-commerce locators example...');
const browser = await chromium.launch({ headless: false, slowMo: 200 });
const page = await browser.newPage();
await page.goto('https://www.amazon.com');
console.log('1. Navigated to Amazon');
// Handle cookie consent if present
try {
const cookieAccept = await
page.$('input[data-cel-widget*="sp-cc-accept"]');
if (cookieAccept) {
await cookieAccept.click();
console.log('2. Accepted cookies');
}
} catch (error) {
console.log('2. No cookie banner found');
}
// Search for products
await page.waitForSelector('#twotabsearchtextbox', { state: 'visible', timeout: 60000 });
await page.fill('#twotabsearchtextbox', 'wireless headphones');
await page.click('#nav-search-submit-button');
console.log('3. Searched for wireless headphones');
// Wait for search results
await page.waitForSelector('[data-component-type="s-search-result"]');
// Get product information
const products = await page.$$('[data-component-type="s-search-result"]');
console.log(`4. Found ${products.length} products`);
// Extract product details from first few items
for (let i = 0; i < Math.min(3, products.length); i++) {
const product = products[i];
const titleElement = await product.$('h2 a');
const title = titleElement ? await titleElement.textContent() : 'No title';
const priceElement = await product.$('.a-price-whole');
const price = priceElement ? await priceElement.textContent() : 'No price';
console.log(` Product ${i + 1}: ${title?.trim()} - $${price}`);
}
// Click on first product
if (products.length > 0) {
const firstProduct = await products[0].$('h2 a');
if (firstProduct) {
await firstProduct.click();
console.log('5. Clicked on first product');
// Wait for product page
await page.waitForSelector('#productTitle');
const productTitle = await page.textContent('#productTitle');
console.log('6. Product page loaded:', productTitle?.trim());
}
else{
    console.log('5. First product link not found');
}
}
await page.waitForTimeout(5000);
await browser.close();
console.log('✅ E-commerce example completed');
}
ecommerceExample().catch(console.error);