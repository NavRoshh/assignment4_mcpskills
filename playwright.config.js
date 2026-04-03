const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:4317",
    headless: true,
  },
  webServer: {
    command: "node server.js",
    port: 4317,
    reuseExistingServer: true,
  },
});
