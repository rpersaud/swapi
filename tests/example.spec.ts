import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
});

test('swapi test', async({ page }) => {
    await page.goto('http://localhost:3000');

    await expect(page).toHaveTitle(/whiteSpace/);

    // await page.pause();
});