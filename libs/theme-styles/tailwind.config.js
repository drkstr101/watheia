const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/*!(*.stories|*.spec).{js,ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [require('../../tailwind-workspace-presets.js')],
};
