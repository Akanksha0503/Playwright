import {test,expect} from '@playwright/test'
test('Handle Navigation with a redirect',async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page).toHaveTitle('The Internet');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/');

});