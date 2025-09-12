// Task 3: Import Playwright Page type
const { expect}=require( '@playwright/test');

// Task 4: Declare HomePage class
class HomePage {


  // Task 6: Define locators
  

  constructor(page) {
    this.page = page;
    this.bookStoreHeader = page.getByText('Book Store',{exact: true}); // Header text
    this.searchBox = page.locator('input[placeholder="Type to search"]'); // Search input
    this.loginButton = page.locator('#login'); // Login button by ID
    this.firstBookTitle = page.locator('div.action-buttons a').first(); // First book link
  }

  // Task 7: Navigation method
  async navigate() {
    await this.page.goto('https://demoqa.com/books');
  }

  // Task 8: Search method
  async searchForBook(bookTitle) {
    await this.searchBox.fill(bookTitle);
    await this.page.keyboard.press('Enter');
  }
}
module.exports = { HomePage };  // Task 5: Constructor with Page parameter
