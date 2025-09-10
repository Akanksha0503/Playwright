const { test, expect } = require('@playwright/test');
test('Cross-browser content verification', async ({ page, browserName }) => {
// Navigate to test page
await page.goto('https://httpbin.org/html');
// Verify basic structure exists in all browsers
await expect(page.locator('h1')).toHaveText('Herman Melville - Moby-Dick');
// Verify paragraph content
const paragraph = page.locator('p');
await expect(paragraph).toContainText('blistered old blacksmith, had not removed his portable forge to the');
// Browser-specific assertions
if (browserName === 'chromium') {
console.log('Running on Chromium');
} else if (browserName === 'firefox') {
console.log('Running on Firefox');
} else if (browserName === 'webkit') {
console.log('Running on WebKit (Safari)');
}
// Take browser-specific screenshots
await page.screenshot({ path: `screenshot-${browserName}.png` });

});