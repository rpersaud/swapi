import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
});

/**
 * Ideally, we'd want to run a couple automation tests to verify the contract
 * between the UX + our code - 
 * - does the initial page load characters
 * - are there clickable navigation items such as next, previous
 * - can you click next, see a bunch of different characters, then go back and see existing
 * - will clicking on each item expand and collapse with data that fits format
 * NOTE: This worked out the box initially, but swapping between npm + pnpm might have
 * corrupted some dependencies
 * TODO: fix playwright out the box with create-react-app + typescript
 * 
 */
test('swapi test', async({ page }) => {
    await page.goto('http://localhost:3000');

    await expect(page).toHaveTitle(/whiteSpace/);

    // await page.pause();
});