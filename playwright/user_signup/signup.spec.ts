import { test, expect } from '@playwright/test';

test('Looped User Sign Up with Incrementing Username and Email', async ({ page }) => {
    // Define base username, email, and password
    const baseUsername = 'alice';
    const baseEmail = 'alice';
    const password = 'test1234';

    // Define the number of times you want the loop to run
    const loopCount = 5; // You can adjust this as needed

    for (let i = 1; i <= loopCount; i++) {
        // Generate the incremented username and email for each loop
        const username = `${baseUsername}${i}`;
        const email = `${baseEmail}${i}@gmail.com`;

        // Navigate to login page
        await page.goto('http://localhost:3000/auth/login');

        // Sign up process
        await page.getByRole('link', { name: 'Sign up' }).click();
        await page.locator('#username').fill(username);
        await page.locator('#email').fill(email);
        await page.locator('#password').fill(password);
        await page.locator('#repassword').fill(password);
        await page.locator('div').filter({ hasText: /^Sign up$/ }).dblclick();

        // Sign out after account creation
        await page.getByRole('button', { name: 'User' }).click();
        await page.getByRole('menuitem', { name: 'Sign out' }).click();

        // Save current state (if applicable)
        await page.getByRole('button', { name: 'Save' }).click();
    }
});
