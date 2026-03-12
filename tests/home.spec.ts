import { test, expect } from "@playwright/test";

test("homepage shows site name and cards", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByPlaceholder("E'lonlarni qidirish")
  ).toBeVisible();

  await expect(page.getByText("Mashhur e'lonlar")).toBeVisible();
});

