import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import path from "path";

console.log(path.join(__dirname, "__e2e__", "test"));

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve("./__e2e__/globalSetup.ts"),
  testDir: path.join(__dirname, "__e2e__", "test"),
  testMatch: "*.spec.ts",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    actionTimeout: 0,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  // webServer: {
  //   command: "yarn run dev",
  //   port: 3000,
  // },
};

export default config;
