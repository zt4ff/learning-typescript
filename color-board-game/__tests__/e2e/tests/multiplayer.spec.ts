import { test, Page, chromium } from "@playwright/test";
import { close, makeMoves, open } from "../pages/canvas.component";

test.describe("MULTIPLAYER PLAYER", () => {
  // figure out testing strategy for multiplayer
  let page: Page;

  test.beforeAll(async () => {
    const browser = await chromium.launch();
    page = await browser.newPage();
    await open(page, "multiplayer");
  });

  test.afterAll(async () => {
    await close(page);
  });

  test("trying mocking and intercepting the websocket connection", async () => {
    await page.on("websocket", (page) => {
      console.log(page);
    });
  });

  test("make 3 moves", async () => {
    test.setTimeout(60000);
    await makeMoves(page, 3);
  });
});
