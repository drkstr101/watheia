/* eslint-disable @typescript-eslint/ban-ts-comment */
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';

import { workspaceRoot } from '@nx/devkit';
import { join } from 'path';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

const specDirectory = join(workspaceRoot, 'apps/screenplay/src');
const outputDirectory = join(workspaceRoot, 'dist/.playwright/apps/screenplay');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  reporter: [
    ['line'],
    ['html', { open: 'never' }],
    [
      '@serenity-js/playwright-test',
      {
        crew: [
          '@serenity-js/console-reporter',
          ['@serenity-js/serenity-bdd', { specDirectory }],
          [
            '@serenity-js/core:ArtifactArchiver',
            { outputDirectory: join(outputDirectory, 'serenity-report') },
          ],
          // '@serenity-js/core:StreamReporter',  // use for debugging
        ],
      },
    ],
  ],
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // @ts-expect-error
    defaultActorName: 'Alice',
    crew: [
      // Take screenshots of failed Serenity/JS Activities, such as a failed assertion, or o failed interaction
      // ['@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' }],

      // Take screenshots of all the Activities, both successful and failed
      ['@serenity-js/web:Photographer', { strategy: 'TakePhotosOfInteractions' }],
    ],
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'yarn nx serve home',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Uncomment for mobile browsers support
    /* {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, */

    // Uncomment for branded browsers
    /* {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    } */
  ],
});
