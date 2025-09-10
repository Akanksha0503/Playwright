const { chromium } = require('playwright');
async function basicLocators() {
console.log('�� Starting basic locators example...');
const browser = await chromium.launch({ headless: false, slowMo: 100 });
const page = await browser.newPage();
await page.goto('https://github.com');
console.log('1. Navigated to GitHub');
// Different selector types
const cssSelector = await page.$('header');
console.log('2. Found header using CSS selector');
const textSelector = await page.$('text=Sign up');
console.log('3. Found "Sign up" using text selector');
const xpathSelector = await page.$('xpath=//a[contains(@href, "login")]');
console.log('4. Found login link using XPath');
// Multiple elements
const allLinks = await page.$$('a');
console.log(`5. Found ${allLinks.length} links on page`);
// Get element properties
const signupText = await textSelector.textContent();
console.log('6. Sign up button text:', signupText?.trim());
await page.waitForTimeout(2000);
await browser.close();
console.log('✅ Basic locators example completed');
}
basicLocators().catch(console.error);
