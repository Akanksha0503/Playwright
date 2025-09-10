const { test, expect } = require('@playwright/test');
test('Advanced navigation patterns', async ({ page }) => {
// Navigate to redirector page
await page.goto('https://the-internet.herokuapp.com/redirector');
// Click redirect link and wait for navigation
await Promise.all([
    page.waitForNavigation(),
    page.click('#redirect')
]);
// Work with the new page

await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes');
// Close the new page and return to original
await page.goBack();
// Verify we're still on original page
await expect(page).toHaveURL('https://the-internet.herokuapp.com/redirector');

// Test waiting for specific navigation events
await Promise.all([
page.waitForNavigation({ waitUntil: 'networkidle' }),
page.goto('https://the-internet.herokuapp.com/')
]);
// Verify navigation completed
await expect(page).toHaveURL('https://the-internet.herokuapp.com/');
// Test reload with options
await page.reload({ waitUntil: 'domcontentloaded' });
});