import { test, expect } from '@playwright/test';
 
test('H&B search and basket flow (basic with try/catch, assertions, consoles)', async ({ page }) => {
  // Echo browser console + page errors
  page.on('console', (msg) => console.log(`[BROWSER ${msg.type()}] ${msg.text()}`));
  page.on('pageerror', (err) => console.log(`[PAGEERROR] ${err.message}`));
 
  // 1) Open home
  try {
    await page.goto('https://www.hollandandbarrett.com/', { waitUntil: 'domcontentloaded' });
    console.log('Opened Holland & Barrett home');
    await expect(page).toHaveURL(/hollandandbarrett\.com/i);
  } catch (error) {
    console.error('Failed to open home:', error);
  }
  await page.waitForTimeout(5000);
 
  // 2) Handle cookie banner (Manage cookies -> Reject All)
  try {
    const manage = page.getByRole('button', { name: 'Manage cookies' });
    if (await manage.isVisible({ timeout: 3000 }).catch(() => false)) {
      await manage.click();
      console.log('Clicked Manage cookies');
      const rejectAll = page.getByRole('button', { name: 'Reject All' });
      await expect(rejectAll).toBeVisible();
      await rejectAll.click();
      console.log('Clicked Reject All');
    } else {
      console.log('Cookie banner not present');
    }
  } catch (error) {
    console.error('Failed while handling cookies:', error);
  }
 
  // 3) Search for "vitamin d"
  try {
    const searchInput = page.locator('[data-test="desktop-search-input"]');
    await expect(searchInput).toBeVisible();
    await searchInput.click();
    await searchInput.fill('vitamin d');
    console.log('Filled search input with "vitamin d"');
 
    const searchBtn = page.getByRole('button', { name: 'Search products, brands,' });
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();
    console.log('Clicked search button');
 
    // Basic results assertion (URL or results grid)
    await expect(page).toHaveURL(/search/i);
  } catch (error) {
    console.error('Failed during search:', error);
  }
 
  // 4) Click product card primary button (as per your locator chain)
 
  try {
    const favLink = page.getByRole('link', {
      name: 'Add to favourite button Image 1 for Vitamin D3 4000 I.U. 100ug 120 Tablets',
    });
 
    // Ensure product card is in view and visible
    await favLink.scrollIntoViewIfNeeded().catch(() => {});
    await expect(favLink).toBeVisible({ timeout: 15000 });
 
    const primaryBtn = favLink.locator('[data-test="button-ProductCard"]');
    await expect(primaryBtn).toBeVisible();
    const btnText = (await primaryBtn.textContent())?.trim() || '';
    console.log(`Product card button text: "${btnText}"`);
    await primaryBtn.click();
    console.log('Clicked product card primary button');
 
  } catch (error) {
    console.error('Failed to click product card button:', error);
  }
  await page.waitForTimeout(3000);
 
  // 5) Close any overlay (header close button)
  try {
    const closeHeader = page.locator('.HeaderPart-module_closeButton__aR8cs');
    if (await closeHeader.isVisible({ timeout: 3000 }).catch(() => false)) {
      await closeHeader.click();
      console.log('Closed header overlay');
    } else {
      console.log('Header overlay close button not visible');
    }
  } catch (error) {
    console.error('Failed to close header overlay:', error);
  }
 
  // 6) Go to basket
  try {
    const basketLink = page.getByTestId('basket-link');
    await expect(basketLink).toBeVisible();
    await basketLink.click();
    console.log('Clicked basket link');
    await expect(page).toHaveURL(/basket|cart/i);
 
    // Basic basket page signal (title header or basket item row)
    const basketHeader = page.getByRole('heading', { name: /basket|shopping/i });
    const anyItem = page.locator('[data-test*="basket-item"], [class*="basketItem"], [data-testid*="basket"]');
    if (await basketHeader.isVisible().catch(() => false)) {
      console.log('Basket header visible');
    } else if (await anyItem.first().isVisible().catch(() => false)) {
      console.log('Basket contains at least one item');
    } else {
      console.warn('Basket page loaded but no visible header/items detected');
    }
  } catch (error) {
    console.error('Failed to open or verify basket:', error);
  }
 
  // 7) Optional short wait to observe state in headed runs
  try {
    const pauseMs = 3000;
    console.log(`Waiting ${pauseMs} ms for visual verification...`);
    await page.waitForTimeout(pauseMs);
  } catch (error) {
    console.error('Failed during final wait:', error);
  }
});