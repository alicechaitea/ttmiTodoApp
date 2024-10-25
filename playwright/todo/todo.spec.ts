import { test, expect } from "@playwright/test";

test.describe.serial("To-Do List Management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/auth/login");
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("test1234");
    await page
      .locator("div")
      .filter({ hasText: /^Log in$/ })
      .dblclick();

    // Verify that the text "ToDo List" is visible after login
    const todoListHeader = page.locator("text=ToDo List");
    await expect(todoListHeader).toBeVisible();
  });

  test("Add a new task to the to-do list", async ({ page }) => {
    const todoListHeader = page.locator("text=ToDo List");
    await expect(todoListHeader).toBeVisible();

    await page.locator("#title").fill("Task #1");
    await page.locator("#description").fill("wake up at 8 AM");
    await page.getByRole("button", { name: "Add todo" }).click();
    // Check visibility
    await expect(
      page.locator('//*[@id="root"]/div/div[2]/div/div/ul/li[2]/div[1]/span')
    ).toBeVisible();

    // Retrieve the text content
    const textContent = await page
      .locator('//*[@id="root"]/div/div[2]/div/div/ul/li[2]/div[1]/span')
      .textContent();
    console.log(textContent);
    while ((await page.getByLabel("delete").count()) > 0) {
      // Click the first available trashcan (delete) button
      await page.getByLabel("delete").first().dblclick();

      // Confirm deletion by clicking the "Delete" confirmation button
      await page.getByRole("button", { name: "Delete" }).dblclick();
    }
  });
});
