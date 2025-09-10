import{test,expect} from'@playwright/test'
test('Navigate and Verify URL',async({page}) =>{
await page.goto('https://www.google.com/');
await expect(page).toHaveURL('https://www.google.com/');
console.log("Navigation Successful !");
});