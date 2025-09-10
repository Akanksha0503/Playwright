import { test, expect } from '@playwright/test';
 
test('GitHub basic navigation and login', async ({ page }) => {

  // 1. Go to GitHub homepage

  await page.goto('https://github.com/');

  console.log('Opened GitHub homepage');
 
  // 2. Click "Sign up"

  await page.getByRole('link', { name: 'Sign up' }).click();

  console.log('Clicked Sign up');

  await page.waitForTimeout(2000);

  // 3. Navigate back to homepage

  await page.goto('https://github.com/');

  console.log('Returned to homepage');
 
  // 4. Click "Sign in"

  await page.getByRole('link', { name: 'Sign in' }).click();

  console.log('Opened Sign in page');
 
  // 5. Fill username/email

  await page.getByLabel(/Username or email address/i).fill('akankshasingh050304@gmail.com');

  console.log('Filled username/email field');
 
  // 6. Fill password

  await page.getByLabel(/Password/i).fill('Aka$0503');

  console.log('Filled password field');
 
  // 7. Click Sign in

  await page.getByRole('button', { name: 'Sign in' }).click();

  console.log('Clicked Sign in button');
 
  // Wait for a few seconds to observe

  await page.waitForTimeout(5000);
 
  // 8. Explore user navigation and repositories

  try {

    await page.getByRole('button', { name: 'Open user navigation menu' }).click();

    console.log('Opened user navigation menu');

    await page.getByRole('button', { name: 'Feature preview' }).click();

    console.log('Opened Feature preview');

    await page.waitForTimeout(2000);

    await page.getByRole('dialog', { name: 'Feature preview dialog' }).getByLabel('Close').click();

    console.log('Closed Feature preview dialog');
 
    await page.getByRole('link', { name: 'Your repositories' }).click();

    console.log('Navigated to Your repositories');
 
    await page.goto('https://github.com/Akanksha0503?tab=repositories');

    console.log('Opened repositories page');

  } catch {

    console.warn('Some navigation steps may not be available without successful login.');

  }

});
 