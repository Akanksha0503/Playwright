import { test, expect } from '@playwright/test';

test('Wikipedia navigation and content exploration', async ({ page }) => {
  // 🌐 Navigate to Wikipedia homepage
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');
  console.log('Opened Wikipedia homepage');

  // 🧭 Verify main heading using Role locator
  await expect(page.getByRole('heading', { name: 'Wikipedia' }).first()).toBeVisible();
  await expect(page.locator('#Welcome_to_Wikipedia')).toBeVisible();
  console.log('Verified heading using Role locator');

  // 🧭 Verify subtitle using Text locator
  await expect(page.getByText('From today\'s featured article')).toBeVisible();
  console.log('Verified subtitle using Text locator');

  // 🔍 Fill search input using Placeholder locator
  await page.getByPlaceholder('Search Wikipedia').first().fill('Playwright(software)');
  console.log('Filled search input using Placeholder locator');

  // 🔍 Click search button using Role locator
  await page.getByRole('button', { name: 'Search' }).click();
  console.log('Clicked search button using Role locator');
  // ⏳ Wait for navigation
  await page.waitForLoadState('networkidle');
  console.log('Search results page loaded');

  // 🔗 Click first search result to go to an article page
  const firstResult = page.locator('.mw-search-result-heading a').first();
  if (await firstResult.isVisible()) {
    await firstResult.click();
    await page.waitForLoadState('networkidle');
    console.log('Navigated to first article from search results');
  } else {
    console.log('No search results found');
   
  }
  // 📑 Click "Contents" section using chained locator (if exists)
  const contentsSection = page.locator('#toc').getByText('Contents');
  if (await contentsSection.isVisible()) {
    await contentsSection.click();
    console.log('Clicked "Contents" section using chained locator');
  } else {
    console.log('"Contents" section not found');
  }

  // 📑 Click "Installation" section if present using filtered locator
  const installSection = page.locator('#toc').getByText('Installation', { exact: false });
  if (await installSection.isVisible()) {
    await installSection.click();
    console.log('Clicked "Installation" section using filtered locator');
  } else {
    console.log('Installation section not found using filtered locator');
  }

  // 🔗 Click first internal link using :has() locator

  const firstLink = page.locator('p:has(a)').first().locator('a').first();
if (await firstLink.isVisible()) {
  const href = await firstLink.getAttribute('href');
  console.log(`First paragraph with link found using :has(): ${href}`);
  await firstLink.click();
  console.log('Clicked first internal link using nested locator inside :has()');
} else {
  console.log('No internal link found in first paragraph');
}
  // 📂 Click sidebar link using :has-text() inside nav (if exists)
  const sidebarNav = page.locator('nav[aria-label="Contents"]').first();
if (await sidebarNav.isVisible()) {
  await sidebarNav.click();
  console.log('Clicked sidebar nav using aria-label');
} else {
  console.log('Sidebar nav with "Contents" not found');
}

  // ⏳ Wait for page to load
  await page.waitForTimeout(1000);
  console.log('Wikipedia navigation completed using Basic And Advanced locators');
});
