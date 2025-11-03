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
      './src/auth.config.ts',
      './src/convex.config.ts',
      './src/crons.ts',
      './src/schema.ts',
      './src/http.ts',
    ],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
  {
    files: ['src/**/*'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['*/_generated/server'],
              importNames: [
                'query',
                'mutation',
                'action',
                'internalQuery',
                'internalMutation',
                'internalAction',
              ],
              message: 'Use `~/functions.ts` for query, mutation, or action',
            },
          ],
        },
      ],
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
