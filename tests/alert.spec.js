import { test, expect } from '@playwright/test';

test('JavaScript alerts with assertions', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  // JS Alert
  page.once('dialog', dialog => {
    console.log(`JS Alert message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole('button', { name: 'Click for JS Alert' }).click();
  const alertResult = await page.locator('#result').textContent();
  console.log(`JS Alert result: ${alertResult}`);
  expect(alertResult).toContain('You successfully clicked an alert');

  // JS Confirm - Dismiss
  page.once('dialog', dialog => {
    console.log(`JS Confirm message (dismiss): ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
  const confirmDismissResult = await page.locator('#result').textContent();
  console.log(`JS Confirm result (dismiss): ${confirmDismissResult}`);
  expect(confirmDismissResult).toContain('You clicked: Cancel');

  // JS Confirm - Accept
  page.once('dialog', dialog => {
    console.log(`JS Confirm message (accept): ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
  const confirmAcceptResult = await page.locator('#result').textContent();
  console.log(`JS Confirm result (accept): ${confirmAcceptResult}`);
  expect(confirmAcceptResult).toContain('You clicked: Ok');

  // JS Prompt - Dismiss
  page.once('dialog', dialog => {
    console.log(`JS Prompt message (dismiss): ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
  const promptDismissResult = await page.locator('#result').textContent();
  console.log(`JS Prompt result (dismiss): ${promptDismissResult}`);
  expect(promptDismissResult).toContain('You entered: null');

  // JS Prompt - Accept with input
  page.once('dialog', dialog => {
    console.log(`JS Prompt message (accept): ${dialog.message()}`);
    dialog.accept('Playwright FTW!').catch(() => {});
  });
  await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
  const promptAcceptResult = await page.locator('#result').textContent();
  console.log(`JS Prompt result (accept): ${promptAcceptResult}`);
  expect(promptAcceptResult).toContain('You entered: Playwright FTW!');

  // JS Prompt - Accept with empty input
  page.once('dialog', dialog => {
    console.log(`JS Prompt message (empty input): ${dialog.message()}`);
    dialog.accept('').catch(() => {});
  });
  await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
  const promptEmptyResult = await page.locator('#result').textContent();
  console.log(`JS Prompt result (empty input): ${promptEmptyResult}`);
  expect(promptEmptyResult).toContain('You entered:');
});