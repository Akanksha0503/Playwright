const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test.describe('OrangeHRM Login Scenarios', () => {
  test('should successfully log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    console.log('Navigating to login page...');
    await loginPage.goto();

    console.log('Entering credentials: username="Admin", password="admin123"');
    await loginPage.login('Admin', 'admin123');

    console.log('Submitting login form and validating success...');
    await loginPage.expectLoginSuccess();

    console.log('Login test completed successfully!');
  });
});