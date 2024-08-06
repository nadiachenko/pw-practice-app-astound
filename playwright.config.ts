import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options.ts'

require('dotenv').config();

export default defineConfig<TestOptions>({

  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  //reporter: 'list',
  // reporter: [
  //   ['json', {outputFile: 'test-results/jsonReport.json'}],
  //   ['junit', {outputFile: 'test-results/junitReport.xml'}]
  // ],
 
  use: {
    baseURL: 'http://localhost:4200',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',

    trace: 'on-first-retry',
    video: 'on'
  },

  projects: [
    {
      name: 'chromium'   
    },

    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        //...devices['iPhone 13 Pro']
        viewport: {width: 414, height: 800}
      }
    },
  ],
});
