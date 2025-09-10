import {test,expect} from '@playwright/test'
test('Practice With Different Domain',async({page})=>{
    await page.goto('https://github.com/');
    console.log(await page.title());
    console.log(await page.url());
    await expect(page).toHaveTitle("GitHub: Let's build from here · GitHub");

});