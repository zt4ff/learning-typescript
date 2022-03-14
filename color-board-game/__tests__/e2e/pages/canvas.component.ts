import { Page, expect, BrowserContext } from "@playwright/test";
import { Eyes, Target } from "@applitools/eyes-playwright";

const selectors = {
  gameboard: '[data-testid="gameboard"]',
  displayedPlayers: '[data-testid="players"] > p',
};

/* Each inner array represents the cordinates on a 2D plane (x, y)  */
const diagonalMoves = [
  [5, 5],
  [45, 45],
  [85, 85],
  [125, 125],
  [165, 165],
];

/* Each inner array represents the cordinates on a 2D plane (x, y)  */
const verticalMoves = [
  [205, 5],
  [205, 45],
  [205, 85],
  [205, 125],
  [205, 165],
];

export const open = async (page: Page, testName: string, eyes?: Eyes) => {
  await page.goto("http://localhost:3000");
  if (eyes) {
    await eyes.open(page, "color-board", testName);
  }
};

export const close = async (page: Page, eyes?: Eyes) => {
  await page.close();
  if (eyes) {
    await eyes.close();
  }
};

export const checkIfCanvasExist = async (page: Page) => {
  expect(page.locator(selectors.gameboard)).toBeVisible();
};

export const getUsernameAndColor = async (
  page: Page
): Promise<[string, string]> => {
  const listOfPlayers = await page.$$(selectors.displayedPlayers);
  const currentPlayer = listOfPlayers[listOfPlayers.length - 1];

  const username = (await currentPlayer.textContent()).trim();
  expect(username).toBeTruthy();

  const color = await currentPlayer.$eval("span", (node) => {
    return node.style.backgroundColor;
  });

  expect(color).toBeTruthy();

  return [username, color];
};

export const makeMoves = async (
  page: Page,
  numberOfMoves: number,
  eyes?: Eyes,
  movementType: "diag" | "vert" = "diag"
) => {
  let moves: Array<Array<number>>;
  if (movementType === "diag") {
    moves = diagonalMoves;
  } else moves = verticalMoves;

  if (numberOfMoves > moves.length) {
    throw new Error(
      `The number of moves should not be greater than ${diagonalMoves.length}`
    );
  }
  for (let i = 0; i < numberOfMoves; i++) {
    await page.locator(selectors.gameboard).click({
      button: "left",
      position: {
        x: moves[i][0],
        y: moves[i][1],
      },
    });
  }

  if (eyes) {
    await eyes.check("board", Target.region(selectors.gameboard).layout());
  }
};

export const multiplayerMoves = async (
  numOfPages: number,
  context: BrowserContext,
  eyes: Eyes
) => {
  // make a page and pre-allocating an array with empty null
  // the Promise.all is necessary because the async callback in Array.map
  // would return a Promise that would resove to what is returned in the callback
  const pages = await Promise.all(
    Array(numOfPages)
      .fill(null)
      .map(async () => {
        const page = await context.newPage();
        return page;
      })
  );

  // mapping through the number of pages and creating a new promise that calls an async IIFE
  const tasks = pages.map(async (page, ind) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await page.goto("http://localhost:3000");

          // if even, make us of the diagonal movement coordinate on the canva
          if (ind % 2 === 0) {
            await makeMoves(page, 5, null, "diag");
          } else await makeMoves(page, 5, null, "vert");

          // making use of the first page in the pages array to take a snapshot and send to applitools
          // for visual testing
          if (ind === 0) {
            await page.waitForTimeout(10000);
            await eyes.open(page, "color-board", "multiplayer");
            await eyes.check(
              "board",
              Target.region(selectors.gameboard).layout()
            );
            await eyes.close();
          }

          resolve(undefined);
        } catch (err) {
          reject(err);
        }
      })();
    });
  });

  // returns an array of promise
  return tasks;
};
