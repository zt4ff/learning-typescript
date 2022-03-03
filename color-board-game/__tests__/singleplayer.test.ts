import { test, expect, chromium } from "@playwright/test";

test.describe("SINGLE PLAYER", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let username: string;
  let color: string;

  test.beforeAll(async () => {
    // open a single browser state and store the username and color somewhere
    await page.goto("http://localhost:3000");
  });

  test("test", async () => {
    expect(page).toHaveTitle(/P/);
  });

  // test("confirm username is displayed on the client", async () => {});

  // test("make a move and confirm that the canva is updated with color", async () => {});

  // test("reload server and make sure that the username and color changed", async () => {});
});
