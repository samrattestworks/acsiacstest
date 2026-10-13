import { test, expect } from '@playwright/test';

test.describe('ACS IACS Student Chapter Smoke Tests', () => {
  test('Home page renders hero, sections, and navigation', async ({ page }) => {
    await page.goto('/');

    // Check title and hero
    await expect(page).toHaveTitle(/ACS IACS Student Chapter/i);
    await expect(page.getByRole('heading', { name: /American Chemical Society/i })).toBeVisible();

    // Check CTAs
    const joinCta = page.getByRole('link', { name: 'Join Us' }).first();
    await expect(joinCta).toBeVisible();

    // Check About section
    await expect(page.getByRole('heading', { name: /About the Chapter/i })).toBeVisible();
    await expect(page.getByText('[PASTE TEXT FROM ACS WEBSITE HERE]')).toBeVisible();

    // Check Team Preview & Carousel
    await expect(page.getByRole('heading', { name: /Meet the Team/i })).toBeVisible();

    // Check Why Join Us bento grid
    await expect(page.getByRole('heading', { name: /Why Join Us/i })).toBeVisible();
  });

  test('Join page renders action panel, focus areas, and team grid', async ({ page }) => {
    await page.goto('/join');

    // Check header
    await expect(page.getByRole('heading', { name: /Join the Chapter/i })).toBeVisible();

    // Check action cards
    await expect(page.getByRole('heading', { name: 'Application' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Connect' })).toBeVisible();

    // Verify registration default closed state
    await expect(page.getByText('Registrations Closed').first()).toBeVisible();

    // Check What We Work On
    await expect(page.getByRole('heading', { name: /What We Work On/i })).toBeVisible();

    // Check Full Team Grid & Filter Tabs
    const coreFilter = page.getByRole('tab', { name: 'Core' });
    await expect(coreFilter).toBeVisible();
    await coreFilter.click();

    // Verify filtered result
    await expect(page.getByText('Chapter President')).toBeVisible();
  });

  test('404 page handles non-existent routes gracefully', async ({ page }) => {
    await page.goto('/unknown-orbital');
    await expect(page.getByRole('heading', { name: /Orbital Not Found/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Return Home/i })).toBeVisible();
  });
});
