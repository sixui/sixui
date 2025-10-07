import { defineConfig } from 'eslint/config';

import base from './react.js';

/**
 * A custom ESLint configuration for libraries that use Vite.
 */
export default defineConfig(...base, {
  files: ['vite.config.*'],
  rules: {
    'import-x/no-default-export': 'off',
  },
});
