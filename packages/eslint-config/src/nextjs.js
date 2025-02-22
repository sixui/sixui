import tseslint from 'typescript-eslint';

import base from './react.js';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 */
export default tseslint.config(...base, {
  files: [
    'next.config.*',
    'src/app/page.tsx',
    'src/app/layout.tsx',
    'src/app/**/page.tsx',
    'src/app/**/layout.tsx',
  ],
  rules: {
    'import-x/no-default-export': 'off',
  },
});
