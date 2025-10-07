import nextPlugin from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';

import base from './react.js';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 */
export default defineConfig(
  ...base,
  {
    files: [
      'next.config.*',
      'src/app/page.tsx',
      'src/app/layout.tsx',
      'src/app/**/page.tsx',
      'src/app/**/layout.tsx',
      'src/middleware.ts',
    ],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
);
