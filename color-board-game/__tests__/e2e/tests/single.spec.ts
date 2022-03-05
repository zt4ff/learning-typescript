import { test, expect, Page, chromium } from "@playwright/test";
import { Eyes, Target } from "@applitools/eyes-playwright";
import {
  open,
  close,
  checkIfCanvasExist,
  getUsernameAndColor,
  makeMoves,
} from "../pages/canvas.component";

test.describe("singleplayer", () => {
  let page: Page;
  let eyes: Eyes;

  test.beforeAll(async () => {
    const browser = await chromium.launch();
    page = await browser.newPage();
    eyes = new Eyes();
    await open(page, eyes, "singleplayer");
  });

  test.afterAll(async () => {
    await close(page, eyes);
  });

  test("to have a canvas in the page", async () => {
    await checkIfCanvasExist(page);
  });

  test("confirm username and password is provided application", async () => {
    await getUsernameAndColor(page);
  });

  test.only("make 5 moves on game board and check the game state in applitools", async () => {
    test.setTimeout(60000);
    await makeMoves(page, eyes, 5);
  });
});
