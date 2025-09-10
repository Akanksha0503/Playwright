import { test, expect } from '@playwright/test';
 
// Increase overall test timeout to 60 seconds
test.setTimeout(60000);
 
test('CNN navigation and search flow', async ({ page }) => {
  // 1. Open CNN homepage with extended timeout
  await page.goto('https://edition.cnn.com/', {
    timeout: 45000,
    waitUntil: 'domcontentloaded'
  });
  console.log('Opened CNN homepage');
  await expect(page).toHaveURL(/cnn\.com/);
 
  // 2. Wait for headline link and click
  const headlineLink = page.getByRole('link', { name: /From empty party to an all-/ });
  await headlineLink.waitFor({ state: 'visible', timeout: 10000 });
  await headlineLink.click();
  console.log('Clicked on headline link');
 
  // 3. Click on the article heading
  const articleHeading = page.getByRole('heading', { name: /From empty party to an all-/ });
  await articleHeading.waitFor({ state: 'visible', timeout: 10000 });
  await articleHeading.click();
  console.log('Clicked on article heading');
 
  // 4. Navigate to Business Tech via menu
  await page.getByRole('button', { name: 'Open Menu Icon' }).click();
  const businessTechLink = page.locator('#headerSubNav').getByRole('link', { name: 'Business Tech' });
  await businessTechLink.waitFor({ state: 'visible', timeout: 10000 });
  await businessTechLink.click();
  console.log('Navigated to Business Tech');
 
  // 5. Navigate to World section via menu
  await page.getByRole('button', { name: 'Open Menu Icon' }).click();
  const worldLink = page.locator('#headerSubNav').getByRole('link', { name: 'World', exact: true });
  await worldLink.waitFor({ state: 'visible', timeout: 10000 });
  await worldLink.click();
  console.log('Navigated to World section');
 
  // 6. Perform a search for "stock market"
  await page.getByRole('button', { name: 'Search Icon' }).click();
  const searchBox = page.locator('#headerSubNav').getByRole('textbox', { name: 'Search' });
  await searchBox.waitFor({ state: 'visible', timeout: 10000 });
  await searchBox.fill('stock market');
  await page.locator('#headerSubNav').getByRole('button', { name: 'Submit' }).click();
  console.log('Searched for "stock market"');
 
  // Optional: Short wait to observe in headed mode
  await page.waitForTimeout(3000);
});