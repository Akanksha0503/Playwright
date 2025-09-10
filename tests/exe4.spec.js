const { test, expect } = require('@playwright/test');
test('Navigation and state management', async ({ page }) => {
// Navigate to main page
await page.goto('https://the-internet.herokuapp.com/');
// Click on Form Authentication link
await page.click('a[href="/login"]');
// Verify we're on login page
await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
// Go back to main page
await page.waitForTimeout(3000);
await page.goBack();
await expect(page).toHaveURL('https://the-internet.herokuapp.com/');
// Go forward to login page again
await page.goForward();
await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
// Reload the page
await page.reload();
await page.waitForTimeout(3000);
// Verify page content after reload
await expect(page.locator('h2')).toHaveText('Login Page');
// Test waiting for navigation explicitly
/*await Promise.all([
page.waitForNavigation(),
page.click('a[href="/"]')
]);*/
// Verify we're back on main page
});
