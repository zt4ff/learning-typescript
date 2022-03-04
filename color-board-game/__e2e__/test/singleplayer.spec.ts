import { test, expect, chromium } from "@playwright/test";
import { Eyes, Target } from "@applitools/eyes-playwright";
import { checkIfCanvasExist } from "../pages/canvas.component";

test.describe("SINGLE PLAYER", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let username: string;
  let color: string;
  let eyes: Eyes;

  test.beforeAll(async () => {
    // open a single browser state and store the username and color somewhere
    await page.goto("http://localhost:3000");
    eyes = new Eyes();
    await eyes.open(page, "color-board-game", "singeplayer");
  });

  test.afterAll(async () => {
    await eyes.close();
  });

  test("to have a canvas in the page", async () => {
    await checkIfCanvasExist(page);
  });

  // test("confirm username is displayed on the client", async () => {});

  // test("make a move and confirm that the canva is updated with color", async () => {});

  // test("reload server and make sure that the username and color changed", async () => {});
});
