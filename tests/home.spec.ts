import { test, expect } from "@playwright/test";

test("homepage shows site name and cards", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByPlaceholder("Taom, restoran yoki mahsulot izlash")
  ).toBeVisible();

  await expect(page.getByText("Do'konlardan mahsulotlar")).toBeVisible();
});

