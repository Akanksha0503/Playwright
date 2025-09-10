const { chromium } = require('playwright');
async function advancedLocators() {
    console.log('Starting advanced locators example...');
    const browser = await chromium.launch({ headless: false, slowMo: 150 });
    const page = await browser.newPage();
    await page.goto('https://github.com/search');
    console.log('1. Navigated to GitHub Search');
    // Chained selectors
    const searchInput = await page.$('header >> input[type="text"]');
    await searchInput.type('playwright');
    try {
        await Promise.all([
            page.waitForNavigation(), // Wait for navigation to complete
            searchInput.press('Enter')
        ]);
        // Check for error 429
        const error429 = await page.$('.ErrorPage-module__Status--ITNSj');
        if (error429) {
            const errorText = await error429.textContent();
            if (errorText && errorText.trim() === '429') {
                console.log('Error 429 detected, reloading page...');
                await page.reload();
                // Check for "Too many requests" after reload
                const tooManyReq = await page.$('h1');
                let tooManyReqDetected = true;
                while (tooManyReqDetected) {
                    const tooManyReq = await page.$('h1');
                    if (tooManyReq) {
                        const h1Text = await tooManyReq.textContent();
                        if (h1Text && h1Text.trim().toLowerCase() === 'too many requests') {
                            console.log('"Too many requests" detected after reload, reloading again...');
                            await page.reload();
                            await page.waitForLoadState('domcontentloaded');
                        } else {
                            tooManyReqDetected = false;
                        }
                    } else {
                        tooManyReqDetected = false;
                    }
                }
                // Wait for navigation after reload
                await page.waitForSelector('main h2');
            }
        }
        console.log('2. Typed search query using chained selector');
        // :has() selector
        const repoWithDescription = await page.$$('.repo-list-item:has(p)');
        console.log(`3. Found ${repoWithDescription.length} repos with descriptions`);
        // Wait for specific state
        await page.waitForSelector('main h2');
        console.log('4. Search results are visible');
        // Filter elements by text content
        const javascriptRepos = await page.$$('a:has-text("javascript")');
        console.log(`5. Found ${javascriptRepos.length} JavaScript-related repos`);
        // Get attribute values
        const firstRepo = await page.$('.repo-list-item');
        if (firstRepo) {
            const repoUrl = await firstRepo.$eval('a', el => el.href);
            console.log('6. First repo URL:', repoUrl);
        }
        else {
            console.log('6. No repository items found.');
        }
    } catch (err) {
        console.error('Error during search and reload logic:', err);
    }
    await page.waitForTimeout(3000);
    await browser.close();
    console.log('Advanced locators example completed');
}
advancedLocators().catch(console.error);
 