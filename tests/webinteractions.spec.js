import { test, expect } from '@playwright/test';
import path from 'path';

test('Advanced Web Interactions Suite', async ({ page }) => {
  // 1. Setup and Navigation
  await page.goto('https://demoqa.com/alerts');
  console.log('Navigated to Alerts page');

  await expect(page.locator('h1, .main-header')).toContainText('Alerts');
    console.log('Page title Verified Successfully');
await page.waitForTimeout(1000);
  // 2. Handle a Simple Alert
  page.once('dialog', dialog => {
    console.log(`Alert message: ${dialog.message()}`);
    dialog.accept();
  });
  await page.click('#alertButton');
  await expect(page.locator('#alertButton')).toBeVisible();
  console.log('Simple alert handled');
  console.log('Button & Alert handled successfully');
await page.waitForTimeout(1000);
  // 3. Handle a Confirmation Alert (OK)
  page.once('dialog', dialog => {
    console.log(`Confirmation message: ${dialog.message()}`);
    dialog.accept();
  });
  await page.click('#confirmButton');
  await expect(page.locator('#confirmResult')).toContainText('You selected Ok');
  console.log('Confirmation alert accepted');
  console.log('Confirmation Alert handled successfully');
  await page.waitForTimeout(1000);

  // 4. Navigate and Interact within a Frame
  await page.goto('https://demoqa.com/nestedframes');
  console.log('Navigated to Nested Frames');

  // Verify page header
  const title = await page.title();
expect(title).toContain('DEMOQA');
console.log(`Verified page title: ${title}`);
  // Switch to the parent frame
  const parentFrame = await page.frame({ name: 'frame1' });
  if (!parentFrame) throw new Error('Parent frame not found');

  //  Extract and verify text inside parent frame
  const parentText = await parentFrame.locator('body').innerText();
  expect(parentText.trim()).toContain('Parent frame');
  console.log(`Parent frame text: "${parentText.trim()}"`);

  // Switch to the child frame nested within the parent
  const childFrameHandle = await parentFrame.waitForSelector('iframe');
  const childFrame = await childFrameHandle.contentFrame();
  if (!childFrame) throw new Error('Child frame not found');

  // Step 6: Extract and verify text inside child frame
  const childText = await childFrame.locator('p').innerText();
  expect(childText.trim()).toBe('Child Iframe');
  console.log(`Child frame text: "${childText.trim()}"`);
  console.log('Frame interactions verified');

  await page.waitForTimeout(1000);

  // 5. Perform Complex Mouse Actions
  await page.goto('https://vinothqaacademy.com/mouse-event/');
console.log('Navigated to Mouse Action page');


  // Double-click action
  const doubleClickBtn = page.locator('text=Double Click Me');
  await doubleClickBtn.dblclick();
  await expect(page.locator('#demo')).toContainText('Double Click Action is Performed');
  console.log('Double-clicked the button');
await page.waitForTimeout(1000);

  // Right-click (context click)
  const rightClickBtn = page.locator('text=Right Click Me');
  await rightClickBtn.click({ button: 'right' });
  await expect(page.locator('#myDiv')).toContainText('Mouse Event');
  await expect(page.locator('#myDiv')).toContainText('Alert Popup');
  await expect(page.locator('#myDiv')).toContainText('Registration Form');
  console.log('Right-clicked the button and the context menu appeared');
await page.waitForTimeout(1000);


  // Mouse hover
  const hoverTarget = page.locator('text=Move the mouse over the text box:');
  await hoverTarget.hover();
  console.log('Hovered over the target text');
await page.waitForTimeout(1000);

  // Verify tooltip or new element appears
   await expect(page.locator('#main')).toContainText('Mouse Actions - Tooltip');
  await expect(page.getByRole('textbox', { name: 'Enter First Name' })).toBeEmpty();
  console.log(`Tooltip text showed above Hover`);
await page.waitForTimeout(1000);

console.log('Mouse actions completed');
await page.waitForTimeout(1000);
  // 6. Execute Advanced Keyboard Inputs
  await page.goto('https://demoqa.com/text-box');
  console.log('Navigated to Text Box page');
  const fullName = page.locator('#userName');
  await expect(fullName).toBeVisible();
  await fullName.click();
  await page.keyboard.type('Akanksha');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
  await page.keyboard.type('Singh');
  await expect(fullName).toHaveValue('Singh');
  console.log('Keyboard input sequence completed');
  console.log('Verification successful');
  await page.waitForTimeout(1000);

  // 7. Upload a File
  
  await page.goto('https://the-internet.herokuapp.com/upload');
  console.log('Navigated to File Upload page');
  // Verification Point: Check for the header "File Uploader"
  const head = page.locator('h3');
  await expect(head).toHaveText('File Uploader');
  console.log('Verified header text: File Uploader');

  await expect(page.locator('h3')).toHaveText('File Uploader');
const filePath = path.resolve('C:/Users/Ascendion/Desktop/test_upload.txt');
  await page.setInputFiles('input[type="file"]', filePath);
  await page.click('input[type="submit"]');
  await expect(page.locator('h3')).toHaveText('File Uploaded!');
  await expect(page.locator('#uploaded-files')).toContainText('test_upload.txt');
  console.log('File uploaded! test_upload.txt');
await page.waitForTimeout(1000);

  // 8. Scroll to an Element
   await page.goto('https://the-internet.herokuapp.com/large');
  console.log('Navigated to Large DOM page');

  // Step 2: Locate the table and verify it has many rows
  const table = page.locator('table');
  await expect(table).toBeVisible();
  console.log('Page contains a table');
  const rows = table.locator('tr');
  const rowCount = await rows.count();
  console.log(`Table contains ${rowCount} rows`);
  expect(rowCount).toBeGreaterThan(50); // Ensures it's a large DOM
  await page.waitForTimeout(1000);
  // Step 3: Locate the final row
  const lastRow = rows.nth(rowCount - 1);

  // Step 4: Scroll the final row into view
  await lastRow.scrollIntoViewIfNeeded();
  console.log('Scrolled to final row');
  await page.waitForTimeout(1000);

  // Step 5: Verify the final row is visible and interactable
  await expect(lastRow).toBeVisible();
  await expect(lastRow).toBeInViewport();
    console.log('Final row is visible and interactable');
await page.waitForTimeout(1000);
// Interact: Click the first cell in the final row
  const firstCell = lastRow.locator('td').first();
  await firstCell.click();
  console.log('Clicked cell in row to confirm interaction');
await page.waitForTimeout(1000);



  console.log('All interactions completed successfully');
});