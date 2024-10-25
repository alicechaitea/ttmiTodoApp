import { test, expect } from "@playwright/test";

test.describe("Login Test", () => {
  test("should log in successfully", async ({ page }) => {
    await page.goto("http://localhost:3000/auth/login");

    // Fill in username and password
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("test1234");

    // Click the login button
    await page
      .locator("div")
      .filter({ hasText: /^Log in$/ })
      .dblclick();

    // Verify successful login by checking the presence of "ToDo List" text
    const todoListHeader = page.locator("text=ToDo List");
    await expect(todoListHeader).toBeVisible();
  });
});
