const { test, expect } = require('@playwright/test');
test('Todo input handling', async ({ page }) => {
await page.goto('https://demo.playwright.dev/todomvc/');
// Add multiple todo items
const todoItems = ['Buy groceries', 'Walk the dog', 'Finish homework'];
for (const item of todoItems) {
await page.fill('.new-todo', item);
await page.keyboard.press('Enter');
}
// Verify items were added
const todoCount = await page.locator('.todo-list li').count();
await expect(todoCount).toBe(3);
// Complete first todo
await page.locator('.todo-list li').nth(0).locator('.toggle').check();
// Verify it's completed
await expect(page.locator('.todo-list li').nth(0)).toHaveClass('completed');
// Filter completed items
await page.click('a[href="#/completed"]');
// Verify only completed items show
const visibleTodos = await page.locator('.todo-list li:visible').count();
await expect(visibleTodos).toBe(1);
// Clear completed items
await page.click('.clear-completed');
// Verify no completed items remain
await page.click('a[href="#/"]');
await expect(page.locator('.todo-list li')).toHaveCount(2);
});