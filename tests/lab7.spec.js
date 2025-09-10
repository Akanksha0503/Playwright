import{test,expect} from '@playwright/test'
test('Navigate and Check Page Content',async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page.locator('body')).toContainText('Welcome to the-internet');

});