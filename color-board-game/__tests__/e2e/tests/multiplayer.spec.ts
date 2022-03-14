import { Eyes } from "@applitools/eyes-playwright";
import { test, chromium, Browser, BrowserContext } from "@playwright/test";
import { multiplayerMoves } from "../pages/canvas.component";

test.describe("MULTIPLAYER PLAYER", () => {
  // figure out testing strategy for multiplayer
  let eyes: Eyes;
  let browser: Browser;
  let context: BrowserContext;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    eyes = new Eyes();
  });

  test("multiplayer", async () => {
    test.setTimeout(90000);
    const tasks = await multiplayerMoves(2, context, eyes);

    await Promise.all(tasks);
  });
});
