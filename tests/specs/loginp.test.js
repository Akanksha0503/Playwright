const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login');

// Test data
const VALID_USERNAME = 'Admin';
const VALID_PASSWORD = 'admin123';
const INVALID_USERNAME = 'invaliduser';
const INVALID_PASSWORD = 'wrongpassword';
const EMPTY_STRING = '';

test.describe('OrangeHRM Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    console.log('Setting up test: initializing LoginPage and navigating to login screen...');
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    console.log('Navigation complete.');
  });

  test('Successful login with valid credentials', async () => {
    console.log(`Attempting login with VALID credentials: ${VALID_USERNAME} / ${VALID_PASSWORD}`);
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    console.log('Verifying URL and page title after login...');
    await expect(loginPage.page).toHaveURL(/dashboard/);
    await expect(loginPage.page).toHaveTitle('OrangeHRM');
    console.log('Login successful and dashboard loaded.');
  });

  test('Failed login with invalid username', async () => {
    console.log(`Attempting login with INVALID username: ${INVALID_USERNAME}`);
    await loginPage.login(INVALID_USERNAME, VALID_PASSWORD);
    const errorMessage = await loginPage.getErrorMessage();
    console.log(`Error message received: "${errorMessage}"`);
    expect(errorMessage).toContain('Invalid credentials');
  });

  test('Failed login with invalid password', async () => {
    console.log(`Attempting login with INVALID password: ${INVALID_PASSWORD}`);
    await loginPage.login(VALID_USERNAME, INVALID_PASSWORD);
    const errorMessage = await loginPage.getErrorMessage();
    console.log(`Error message received: "${errorMessage}"`);
    expect(errorMessage).toContain('Invalid credentials');
  });

  test('Failed login with empty username', async () => {
    console.log('Attempting login with EMPTY username...');
    await loginPage.login(EMPTY_STRING, VALID_PASSWORD);
    console.log('Checking for "Required" field validation message...');
    await expect(loginPage.page.locator('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/span')).toContainText('Required');
  });

  test('Failed login with empty password', async () => {
    console.log('Attempting login with EMPTY password...');
    await loginPage.login(VALID_USERNAME, EMPTY_STRING);
    console.log('Checking for "Required" field validation message...');
    await expect(loginPage.page.locator('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/span')).toContainText('Required');
  });

  test('Login page elements visibility', async () => {
    console.log('Checking visibility of logo and login button...');
    const isLogoVisible = await loginPage.isLogoVisible();
    const isLoginButtonVisible = await loginPage.isLoginButtonVisible();
    const pageTitle = await loginPage.getPageTitle();
    console.log(`Logo visible: ${isLogoVisible}, Login button visible: ${isLoginButtonVisible}, Page title: "${pageTitle}"`);
    expect(isLogoVisible).toBe(true);
    expect(isLoginButtonVisible).toBe(true);
    expect(pageTitle).toContain('Login');
  });

  test('Input field placeholders', async () => {
    console.log('Fetching input field placeholders...');
    const usernamePlaceholder = await loginPage.getUsernamePlaceholder();
    const passwordPlaceholder = await loginPage.getPasswordPlaceholder();
    console.log(`Username placeholder: "${usernamePlaceholder}", Password placeholder: "${passwordPlaceholder}"`);
    expect(usernamePlaceholder).toBe('Username');
    expect(passwordPlaceholder).toBe('Password');
  });

  test('Forgot password link functionality', async () => {
    console.log('Clicking "Forgot Password" link...');
    await loginPage.clickForgotPassword();
    console.log('Verifying navigation to reset password page...');
    await expect(loginPage.page).toHaveURL(/requestPasswordReset/);
    await expect(loginPage.page.locator('.orangehrm-forgot-password-title')).toContainText('Reset Password');
    console.log('Forgot password flow verified.');
  });

  test('Clear input fields', async () => {
    console.log('Entering dummy credentials...');
    await loginPage.enterUsername('testuser');
    await loginPage.enterPassword('testpass');
    console.log('Clearing input fields...');
    await loginPage.clearUsername();
    await loginPage.clearPassword();
    const usernameValue = await loginPage.page.getAttribute(loginPage.usernameInput, 'value');
    const passwordValue = await loginPage.page.getAttribute(loginPage.passwordInput, 'value');
    console.log(`Username field value after clear: ${usernameValue}, Password field value after clear: ${passwordValue}`);
    expect(usernameValue).toBe(null);
    expect(passwordValue).toBe(null);
  });
});