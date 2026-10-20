import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [["html", { open: "never" }], ["github"]] : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    // Pure data checks: no browser needed, run once
    { name: "data", testMatch: /data\.spec\.ts/ },
    { name: "chromium", testIgnore: /data\.spec\.ts/, use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", testIgnore: /data\.spec\.ts/, use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", testIgnore: /data\.spec\.ts/, use: { ...devices["Desktop Safari"] } },
    { name: "mobile-chrome", testIgnore: /data\.spec\.ts/, use: { ...devices["Pixel 7"] } },
  ],
  // Tests run against the static export in out/, served like GitHub Pages
  // serves it (clean URLs, 404.html for unknown paths). Run `npm run build` first.
  webServer: {
    command: `npx serve out --listen ${PORT} --no-port-switching`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
