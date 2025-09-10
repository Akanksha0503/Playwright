import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php');
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await expect(page.getByRole('heading', { name: 'Selenium - Automation' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Name:' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Name:' }).click();
  await page.getByRole('textbox', { name: 'Name:' }).fill('akanksha');
  await expect(page.getByRole('textbox', { name: 'Name:' })).toHaveValue('akanksha');
  await page.getByRole('textbox', { name: 'Subjects:' }).click();
  await expect(page.locator('#practiceForm')).toContainText('Subjects:bio');
  await expect(page.locator('#practiceForm')).toContainText('Hobbies: playing');
  await expect(page.locator('#practiceForm')).toContainText('abcd');
  await expect(page.getByRole('banner')).toContainText('Selenium - Automation Practice Forms');
  await expect(page.locator('#practiceForm')).toContainText('Student Registration Forms');
  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - heading "Elements" [level=2]:
      - button "Elements"
    - heading "Forms" [level=2]:
      - button "Forms"
    - list:
      - listitem:
        - link "Practice Form":
          - /url: selenium_automation_practice.php
      - listitem:
        - link "Login":
          - /url: login.php
      - listitem:
        - link "Register":
          - /url: register.php
    - heading "Alerts, Frames & Windows" [level=2]:
      - button "Alerts, Frames & Windows"
    - heading "Widgets" [level=2]:
      - button "Widgets":
        - img
    - heading "Interaction" [level=2]:
      - button "Interaction"
    - heading "Student Registration Form" [level=1]
    - text: "Name:"
    - textbox "Name:": akanksha
    - text: "Email:"
    - textbox "Email:"
    - text: "Gender:"
    - radio "Gender:"
    - text: Male
    - radio
    - text: Female
    - radio
    - text: /Other Mobile\\(\\d+ Digits\\):/
    - textbox /Mobile\\(\\d+ Digits\\):/
    - text: "Date of Birth:"
    - textbox "Date of Birth:"
    - text: "Subjects:"
    - textbox "Subjects:"
    - text: "Hobbies:"
    - checkbox "Hobbies:"
    - text: Sports
    - checkbox
    - text: Reading
    - checkbox
    - text: "Music Picture:"
    - 'button "Picture: State and City"'
    - text: "Current Address:"
    - textbox "Currend Address"
    - text: State and City
    - combobox:
      - option "Choose State" [selected]
      - option "NCR"
      - option "Uttar Pradesh"
      - option "Haryana"
      - option "Rajasthan"
    - combobox:
      - option "Choose City" [selected]
      - option "Agra"
      - option "Lucknow"
      - option "Meerut"
    - button "Login"
    `);
  await expect(page.locator('#headingOne')).toMatchAriaSnapshot(`- button "Elements"`);
  await page.getByRole('textbox', { name: 'Email:' }).click();
});