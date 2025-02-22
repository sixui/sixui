import tseslint from 'typescript-eslint';

import base from './react.js';

/**
 * A custom ESLint configuration for libraries that use Vite.
 */
export default tseslint.config(...base, {
  files: ['vite.config.*'],
  rules: {
    'import-x/no-default-export': 'off',
  },
});
