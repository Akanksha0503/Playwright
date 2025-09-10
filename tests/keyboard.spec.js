const { test } = require('@playwright/test');

test('Keyboard interaction demo', async ({ page }) => {
  console.log('Launching test: Keyboard interaction demo');

  // Navigate to key press demo
  await page.goto('https://the-internet.herokuapp.com/key_presses');
  console.log('Navigated to key press demo page');

  // Simple key press
  await page.click('#target');
  console.log('Pressing "A" key...');
  await page.keyboard.press('A');

  // Modifier key combinations
  console.log('Holding Shift and pressing "A"...');
  await page.keyboard.down('Shift');
  await page.keyboard.press('A'); // Produces 'A'
  await page.keyboard.up('Shift');

  // Type text with delay between keystrokes
  console.log('Typing "Hello World!" with delay...');
  await page.keyboard.type('Hello World!', { delay: 100 });

  // Special keys and navigation
  console.log('Navigating left twice and deleting one character...');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('Backspace');

  // Complex shortcut (Ctrl+A to select all)
  console.log('Performing Ctrl+A to select all...');
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');

  // Switch to another page for input field test
  console.log('Navigating to W3Schools form page...');
  await page.goto('https://www.w3schools.com/html/html_forms.asp');

  const input = await page.$('input[name="firstname"]');
  await input.click();
  console.log('Typing into firstname input field...');

  // Keyboard actions on specific element
  await input.type('Text with special keys: ');
  console.log('Pressing Enter...');
  await page.keyboard.press('Enter');
  await input.type('New line after enter');

  console.log('Waiting briefly before ending test...');
  await page.waitForTimeout(2000);
  console.log('Test completed successfully');
});