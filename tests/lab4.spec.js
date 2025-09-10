import{test,expect} from'@playwright/test'
test('Multiple Navigations in One Step',async({page})=> {
    test.setTimeout(90000);
await page.goto('https://playwright.dev/');
console.log(await page.title());
await page.goto('https://www.wikipedia.org/');
console.log(await page.title());
await page.goto('https://www.google.com');
console.log(await page.title());

});
