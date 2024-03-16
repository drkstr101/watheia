// import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig } from '@playwright/test';

// import { workspaceRoot } from '@nx/devkit';

// // For CI, you may want to set BASE_URL to the deployed application.
// const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

import defaultConfig from './playwright.config';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...defaultConfig,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  reporter: 'html',
});
