import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    const firstCardHTML = await this.productCards.first().innerHTML();
    expect(firstCardHTML).toMatch(/Add to Cart/i);
    await expect(page.locator('#sidebar div').filter({ hasText: /^t-shirts$/ }).getByRole('checkbox')).not.toBeChecked();
    const btn = page.getByRole('button', { name: 'ORDERS' }).click();
    expect(btn).toHaveAttribute('routerlink');
    await expect(this.orderButton).toBeEnabled();
});