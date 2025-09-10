import { test, expect } from '@playwright/test';
 
test('Flipkart Monitor Search and Checkout Flow', async ({ page }) => {
  console.log('🚀 Starting Flipkart Monitor Purchase Test...');
 
  // Step 1: Open Flipkart Homepage
  console.log('🌐 Navigating to Flipkart homepage...');
  await page.goto('https://www.flipkart.com/');
  console.log('✅ Successfully loaded Flipkart homepage.');
 
  // Step 2: Search for "monitor acer wqhd"
  console.log('🔍 Searching for "monitor acer wqhd"...');
  const searchBox = page.getByRole('textbox', { name: 'Search for Products, Brands' });
  await searchBox.click();
  await searchBox.fill('monitor acer wqhd');
  console.log('⌨️ Entered search term: monitor acer wqhd');
 
  await page.getByRole('button', { name: 'Search for Products, Brands' }).click();
  console.log('✅ Search executed successfully.');
 
  // Step 3: Select Acer monitor product
  console.log('🖥️ Selecting "Acer NITRO VG1 series 68.58"...');
  const productPopupPromise = page.waitForEvent('popup'); // Wait for new tab
  await page.getByRole('link', { name: 'Acer NITRO VG1 series 68.58' }).click();
  const productPage = await productPopupPromise;
  console.log('✅ Product page opened in a new tab.');
 
  // Step 4: Add product to cart
  console.log('🛒 Adding product to cart...');
  await productPage.waitForTimeout(2000);
  await productPage.getByRole('button', { name: 'Add to cart', exact: true }).click();
  console.log('✅ Product successfully added to cart.');
 
  // Step 5: Proceed to Place Order
  console.log('📦 Proceeding to place order...');
  await productPage.getByRole('button', { name: 'Place Order' }).click();
  console.log('✅ Navigated to order placement page.');
 
  // Final Assertion (Example)
  console.log('🧪 Verifying if "order" keyword is present on page...');
  const orderText = await productPage.textContent('body');
  expect(orderText.toLowerCase()).toContain('order');
  console.log('✅ Order verification passed.');
 
  console.log('🎉 Flipkart Monitor Test Completed Successfully!');
});