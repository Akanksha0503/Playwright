const { test, expect } = require('@playwright/test');

test('Assertions and Waits with Console Logs on testautomationpractice.blogspot.com', async ({ page }) => {
  console.log('Navigating to the site...');
  await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'networkidle' });

  console.log('Validating URL and Title...');
  await expect(page).toHaveURL(/.*blogspot\.com/);
  await expect(page).toHaveTitle(/Automation/);

  console.log('Waiting for #name input to be visible...');
  await page.waitForSelector('#name', { state: 'visible' });

  console.log('Filling name input...');
  const nameInput = page.locator('#name');
  await nameInput.fill('Akanksha');
  const emaiInput = page.locator('#email');
  await emaiInput.fill('Singh@gmail.com');
  const phoneInput = page.locator('#phone');
  await phoneInput.fill('9748378364');
  const addInput = page.locator('#textarea');
  await addInput.fill('Bangalore');

  console.log('Asserting input value...');
  await expect(nameInput).toHaveValue('Akanksha');
  await expect(emaiInput).toHaveValue('Singh@gmail.com');
  await expect(phoneInput).toHaveValue('9748378364');
  await expect(addInput).toHaveValue('Bangalore');

  console.log('Checking visibility and viewport...');
  await expect(nameInput).toBeVisible();
  await expect(nameInput).toBeInViewport();

  console.log('Checking attribute and class...');
  await expect(nameInput).toHaveAttribute('type', 'text');
  await expect(nameInput).not.toHaveClass(/error/);

  console.log('Checking if email input is enabled...');
  const emailInput = page.locator('#email');
  await expect(emailInput).toBeEnabled();

  console.log('Checking if submit button is hidden...');
  const submitBtn = page.locator('#submit');
  await expect(submitBtn).toBeHidden();

  console.log('Selecting gender radio and asserting...');
  const genderRadio = page.locator('input[value="female"]');
  await genderRadio.check();
  await expect(genderRadio).toBeChecked();

  console.log('Checking header text...');

  // Use getByRole for a heading with name "Tabs"
  const tabsHeader = page.getByRole('heading', { name: 'Tabs' });
  await expect(tabsHeader).toHaveText('Tabs');

  // If you want to check for "Links" in any heading:
  const linksHeader = page.getByRole('heading', { name: /Links/ }).first();
  await expect(linksHeader).toContainText('Links');

  console.log('Checking label text...');

  // Use getByRole for a button with accessible name "Submit"
  const submitButton = page.getByRole('button', { name: 'Submit' }).first();

  await expect(submitButton).toBeVisible();
  await expect(submitButton).toContainText('Submit');

  console.log('Checking table cell text...');
  const firstCell = page.locator('table td').first();
  await expect(firstCell).toContainText('Learn Selenium');

  console.log('Checking dropdown default value...');
  const countrySelect = page.locator('#country');
  await countrySelect.selectOption('India');
  await expect(countrySelect).toHaveValue('india'); // Adjust if needed

  console.log('Waiting for custom JS condition...');
  await page.waitForFunction(() => document.querySelector('#name')?.value === 'Akanksha');

  console.log(' Waiting for timeout (1s)...');
  await page.waitForTimeout(1000);

  console.log('All assertions and waits completed successfully!');
});
