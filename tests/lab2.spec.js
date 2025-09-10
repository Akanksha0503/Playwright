import {test,expect} from '@playwright/test'
test('Verify Website title', async ({page}) =>{
await page.goto('https://www.wikipedia.org/')
await expect.toHaveTitle('Wikipedia');
console.log(page.url());
});