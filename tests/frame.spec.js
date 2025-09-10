import { test, expect } from '@playwright/test';

test('Interact with multiple frames and validate input', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');
  console.log('Navigated to frames demo page');

  // Frame 0
  const frame0 = await page.frameLocator('frame').first();
  console.log('Accessing Frame 0');
  await frame0.getByRole('textbox').click();
  await frame0.getByRole('textbox').fill('hi');
  console.log('Filled "hi" in Frame 0');
  await expect(frame0.getByRole('textbox')).toHaveValue('hi');
  console.log('Assertion passed for Frame 0');

  // Frame 1
  const frame1 = await page.frameLocator('frame').nth(1);
  console.log('Accessing Frame 1');
  await frame1.getByRole('textbox').click();
  await frame1.getByRole('textbox').fill('hello');
  console.log('Filled "hello" in Frame 1');
  await expect(frame1.getByRole('textbox')).toHaveValue('hello');
  console.log('Assertion passed for Frame 1');

  // Frame 2
  const frame2 = await page.frameLocator('frame').nth(2);
  console.log('Accessing Frame 2');
  await frame2.getByRole('textbox').click();
  await frame2.getByRole('textbox').fill('hey');
  console.log('Filled "hey" in Frame 2');

  // Frame 3
  const frame3 = await page.frameLocator('frame').nth(3);
  console.log('Accessing Frame 3');
  await frame3.getByRole('textbox').click();
  await frame3.getByRole('textbox').fill('blue');
  console.log('Filled "blue" in Frame 3');

  // Frame 4
  const frame4 = await page.frameLocator('frame').nth(4);
  console.log('Accessing Frame 4');
  await frame4.getByRole('textbox').click();
  await frame4.getByRole('textbox').fill('bye');
  console.log('Filled "bye" in Frame 4');
});