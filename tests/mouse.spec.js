import { test, expect } from '@playwright/test';

test('Mercury Tours login and menu interaction', async ({ page }) => {
  await page.goto('https://demo.guru99.com/test/newtours/');
  console.log('Navigated to Mercury Tours homepage');
await page.waitForTimeout(1000);
  // Username field interaction
  const usernameInput = page.locator('input[name="userName"]');
  await usernameInput.click();
  console.log('Clicked on username field');
await page.waitForTimeout(1000);

  await usernameInput.fill('Abcd');
  console.log('Filled username with: Abcd');
await page.waitForTimeout(1000);
  // Password field interaction
  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.click();
  console.log('Clicked on password field');
  await page.waitForTimeout(1000);


  await passwordInput.fill('abcd1234');
  console.log('Filled password with: abcd1234');
  await page.waitForTimeout(1000);

  // Hover over menu items
  const menuItems = ['Hotels', 'Destinations'];

for (const item of menuItems) {
  let menuLink;

  try {
    // Try using getByRole with .first() to avoid strict mode violation
    menuLink = page.getByRole('link', { name: item }).first();
    await menuLink.hover();
    console.log(`Hovered over menu item (by role): ${item}`);
  } catch (error) {
    console.warn(`getByRole failed for "${item}", trying getByText`);
    menuLink = page.getByText(item);
    await menuLink.hover();
    console.log(`Hovered over menu item (by text): ${item}`);
      

  }
  await page.waitForTimeout(1000);
}

  // Right-click on menu container
  await page.locator('div').filter({ hasText: 'Home Flights Hotels Car' }).click({ button: 'right' });
  console.log('Right-clicked on menu container');
    await page.waitForTimeout(1000);

  // Double-click on "Specials" image
  await page.getByRole('img', { name: 'Specials' }).dblclick();
  console.log('Double-clicked on Specials image');
    await page.waitForTimeout(1000);
    //Drag and drop
await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
const columnA = page.locator('#column-a');
const columnB = page.locator('#column-b');
await columnA.dragTo(columnB);
  console.log('Dragged And Dropped of Column A & Column B');
  await page.waitForTimeout(1000);
// Precise mouse movements with coordinates
await page.mouse.move(100, 100);
await page.mouse.down();
await page.mouse.move(200, 100);
await page.mouse.move(200, 200);
await page.mouse.move(100, 200);
await page.mouse.move(100, 100);
await page.mouse.up();
    console.log('Performed precise mouse movements to draw a square');
    await page.waitForTimeout(1000);
// Mouse wheel scrolling
await page.mouse.wheel(0, 500); // Scroll down 500 pixels
await page.mouse.wheel(500,0);
console.log('Scrolled up and down using mouse wheel');
await page.waitForTimeout(2000);
    console.log('Test completed successfully');

});