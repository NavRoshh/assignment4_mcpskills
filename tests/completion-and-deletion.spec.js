const { test, expect } = require("@playwright/test");

test("completing an active task moves it into the completed section", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Add a task").fill("Tracer bullet task");
  await page.getByRole("button", { name: "Add Task" }).click();

  await expect(page.getByRole("region", { name: "Active" })).toContainText("Tracer bullet task");
  await page.getByRole("checkbox", { name: 'Mark "Tracer bullet task" as complete' }).click();

  await expect(page.getByRole("region", { name: "Active" })).not.toContainText("Tracer bullet task");
  await expect(page.getByRole("region", { name: "Completed" })).toContainText("Tracer bullet task");
});

test("deleting a completed task removes it and updates the counters", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Add a task").fill("Delete me");
  await page.getByRole("button", { name: "Add Task" }).click();
  await page.getByRole("checkbox", { name: 'Mark "Delete me" as complete' }).click();

  await expect(page.getByText("Active").locator("..")).toContainText("0");
  await expect(page.getByText("Completed").locator("..")).toContainText("1");

  await page.getByRole("button", { name: 'Delete "Delete me"' }).click();

  await expect(page.getByRole("region", { name: "Completed" })).not.toContainText("Delete me");
  await expect(page.getByText("Active").locator("..")).toContainText("0");
  await expect(page.getByText("Completed").locator("..")).toContainText("0");
});
