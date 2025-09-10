import {test,expect} from '@playwright/test'
test('Validate page Title and URL',async({ page }) =>{
await page.goto('https://www.hollandandbarrett.com/');

const actTitle=await page.title();

const actURL= page.url();

const expeTitle="Holland & Barrett - UK's Leading Health & Wellbeing Store";
const expeURL='https://www.hollandandbarrett.com/';
expect(actTitle).toBe(expeTitle);
expect(actURL).toBe(expeURL);
});