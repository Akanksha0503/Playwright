class LoginPage {
constructor(page) {
this.page = page;
// Locators
this.usernameInput = 'input[name="username"]';
this.passwordInput = 'input[name="password"]';
this.loginButton = 'button[type="submit"]';
this.errorMessage = '.oxd-alert-content-text';
this.forgotPasswordLink = '.orangehrm-login-forgot';
this.loginTitle = '.orangehrm-login-title';
this.logo = '.orangehrm-login-branding';
}
async navigate() {
await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
await this.page.waitForLoadState('networkidle');
}
async enterUsername(username) {
await this.page.fill(this.usernameInput, username);
}
async enterPassword(password) {
await this.page.fill(this.passwordInput, password);
}
async clickLogin() {
await this.page.click(this.loginButton);
}
async login(username, password) {
await this.enterUsername(username);
await this.enterPassword(password);
await this.clickLogin();
}
async getErrorMessage() {
await this.page.waitForSelector(this.errorMessage, { timeout: 5000 });
return await this.page.textContent(this.errorMessage);
}
async clickForgotPassword() {
await this.page.click(this.forgotPasswordLink);
}
async getPageTitle() {
return await this.page.textContent(this.loginTitle);
}
async isLogoVisible() {
return await this.page.isVisible(this.logo);
}
async isLoginButtonVisible() {
return await this.page.isVisible(this.loginButton);
}
async clearUsername() {
await this.page.fill(this.usernameInput, '');
}
async clearPassword() {
await this.page.fill(this.passwordInput, '');
}
async getUsernamePlaceholder() {
return await this.page.getAttribute(this.usernameInput,'placeholder');
}
async getPasswordPlaceholder() {
return await this.page.getAttribute(this.passwordInput,'placeholder');
}
}
module.exports = LoginPage;