import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://edition.cnn.com/',{ timeout: 60000 });
  console.log('Navigated to CNN homepage');

  await page.getByRole('link', { name: 'Trump issues warning to Putin' }).click();
  console.log('Clicked on "Trump issues warning to Putin" link');

  await page.getByRole('link', { name: 'CNN Polls', exact: true }).click();
  console.log('Clicked on "CNN Polls" link');

  await page.getByRole('link', { name: 'Americans largely oppose' }).click();
  console.log('Clicked on "Americans largely oppose" link');

  await page.locator('#pageHeader').getByRole('link', { name: 'CNN logo' }).click();
  console.log('Clicked on CNN logo to return to homepage');

  await page.getByRole('button', { name: 'Search Icon' }).click();
  console.log('Clicked on search icon');

  await page.locator('#headerSubNav').getByRole('textbox', { name: 'Search' }).click();
  console.log('Focused on search textbox');

  await page.locator('#headerSubNav').getByRole('textbox', { name: 'Search' }).fill('stock market');
  console.log('Entered "stock market" into search textbox');

  await page.locator('#headerSubNav').getByRole('textbox', { name: 'Search' }).press('Enter');
  console.log('Pressed Enter to initiate search');

  await page.getByRole('link', { name: 'Bipartisan group of House' }).click();
  console.log('Clicked on "Bipartisan group of House" link');
});