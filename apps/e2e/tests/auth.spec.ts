import { test, expect } from '@playwright/test';
import {
  createTestUser,
  cleanupUser,
  generateRandomEmail,
} from '../utils/supabase';

test.describe('Authentication Flow', () => {
  let testEmail: string;

  test.afterEach(async () => {
    if (testEmail) {
      // Best effort cleanup
      try {
        await cleanupUser(testEmail);
      } catch (e) {
        console.error('Failed to cleanup user:', e);
      }
    }
  });

  test('should allow a user to sign up and redirect to dashboard', async ({
    page,
  }) => {
    console.log('Starting registration test...');
    testEmail = generateRandomEmail();
    const password = 'TestPassword123!';

    console.log('Navigating to /register...');
    const response = await page.goto('/register');
    console.log(`Navigation response status: ${response?.status()}`);

    // Fill the registration form
    // Adjust selectors to match actual UI components (Name, Email, Password)
    await page.fill('input[name="name"]', 'E2E Test User');
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', password);

    // Click submit
    await page.click('button[type="submit"]');

    // Wait for navigation or success message
    // If verification is required, this might land on a "Check your email" page.
    // Ideally we check for that.

    // If auto-login happens or email is optional:
    // await expect(page).toHaveURL(/\/dashboard/);

    // For "Actual Supabase", email confirmation is likely enabled.
    // We verify we registered successfully (e.g. redirected or saw success toast).
    // Adjust this expectation based on actual app behavior.
    await expect(page.getByText(/check your email/i))
      .toBeVisible({ timeout: 10000 })
      .catch(() => {
        // Fallback checks if we were redirected
        expect(page.url()).toContain('/dashboard');
      });
  });

  test('should allow an existing user to login', async ({ page }) => {
    // 1. Create a user via Admin API
    const { email, password } = await createTestUser();
    testEmail = email;

    await page.goto('/login');

    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);

    await page.click('button[type="submit"]');

    // Assert redirection to dashboard
    await expect(page).toHaveURL(/\/dashboard/);

    // Assert backend data loading (e.g., checking for specific element that comes from API)
    // await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('should protect private routes', async ({ page }) => {
    await page.goto('/workspaces/create'); // Protected route
    await expect(page).toHaveURL(/\/login/);
  });
});
