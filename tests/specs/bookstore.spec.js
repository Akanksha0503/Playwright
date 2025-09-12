// Task 9: Import test, expect, HomePage, and allure
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { allure } from 'allure-playwright';

test.describe('Bookstore E2E', () => {
  // Task 10: Write test structure
  test('Search for a specific book and verify results', async ({ page }) => {
    // Task 12: Add Allure tag
    allure.tag('smoke');
    console.log('Test started: Searching for a specific book');

    // Task 11: Initialize Page Object
    const homePage = new HomePage(page);
    console.log('HomePage object initialized');

    // Task 13: Navigate to application
    await homePage.navigate();
    console.log('Navigated to DemoQA Bookstore');

    // Task 14: Assert homepage loaded
    
    await expect(homePage.bookStoreHeader).toBeVisible();
    console.log('Bookstore header is visible');

    // Task 15: Execute search
    const bookTitle = 'Understanding ECMAScript 6';
    await homePage.searchForBook(bookTitle);
    console.log(`Searched for book: "${bookTitle}"`);

    // Task 16: Assert search results
    await expect(homePage.firstBookTitle).toHaveText(bookTitle);
    console.log(`First book title matches expected: "${bookTitle}"`);

    // Task 17: Click on the book
    await homePage.firstBookTitle.click();
    console.log('Clicked on the first book title');

    // Task 18: Assert navigation to book detail
    await expect(page).toHaveURL(/\/books\?book=/);
    console.log('URL contains /books?book= — navigation confirmed');

    // Task 19: Take screenshot
    await page.screenshot({ path: 'book-detail.png', fullPage: true });
    console.log('Screenshot taken: book-detail.png');// The full-page screenshot after navigating to the book details page is showing white background

    console.log('Test completed successfully');
  });
});