import { Page, expect } from "@playwright/test";

const selectors = {
  gameboard: '[data-testid="gameboard"]',
  playersContainer: '[data-testid="players"]',
};

export const checkIfCanvasExist = async (page: Page) => {
  expect(page.locator(selectors.gameboard)).toBeVisible();
};
