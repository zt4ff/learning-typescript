import { Page, expect } from "@playwright/test";
import { Eyes, Target, MatchLevel } from "@applitools/eyes-playwright";

const selectors = {
  gameboard: '[data-testid="gameboard"]',
  displayedPlayers: '[data-testid="players"] > p',
};

/* Each inner array represents the cordinates on a 2D plane (x, y)  */
const nonWinningMoves = [
  [5, 5],
  [45, 45],
  [85, 85],
  [125, 125],
  [165, 165],
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

  const username = await (await currentPlayer.textContent()).trim();
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
  eyes?: Eyes
) => {
  if (numberOfMoves > nonWinningMoves.length) {
    throw new Error(
      `The number of moves should not be greater than ${nonWinningMoves.length}`
    );
  }
  for (let i = 0; i < numberOfMoves; i++) {
    await page.locator(selectors.gameboard).click({
      button: "left",
      position: {
        x: nonWinningMoves[i][0],
        y: nonWinningMoves[i][1],
      },
    });
  }

  if (eyes) {
    await eyes.check("board", Target.region(selectors.gameboard).layout());
  }
};
