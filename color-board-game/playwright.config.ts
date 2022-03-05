import { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import path from "path";

console.log(path.join(__dirname, "__e2e__", "test"));

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve(
    path.join(__dirname, "__tests__", "e2e", "globalSetup.ts")
  ),
  testDir: path.join(__dirname, "__tests__", "e2e"),
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    headless: false,
    launchOptions: { slowMo: 500 },
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
  webServer: {
    command: "yarn run dev",
    port: 3000,
  },
};

export default config;
