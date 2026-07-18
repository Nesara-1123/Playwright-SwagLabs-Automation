import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir:"./tests",
  timeout:15*1000,
  expect:{
    timeout:5*1000
  },
  reporter:"html",
  use:{
    browserName:"chromium",
    headless:false,
    screenshot:"on",
    trace:"on",
    video:"on"
  }
});