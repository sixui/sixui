import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

import base from './typescript.js';

/**
 * A custom ESLint configuration for libraries that use React.
 */
export default defineConfig(...base, {
  files: ['**/*.ts', '**/*.tsx'],
  extends: [
    // https://github.com/jsx-eslint/eslint-plugin-react/tree/master?tab=readme-ov-file#flat-configs
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
  ],
  plugins: {
    'jsx-a11y': jsxA11yPlugin,
    'react-hooks': reactHooksPlugin,
  },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
    },
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    ...reactHooksPlugin.configs.recommended.rules,

    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['default'],
            message: 'Please use named imports instead.',
          },
        ],
      },
    ],

    'react/jsx-one-expression-per-line': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-curly-newline': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx'],
      },
    ],
    'react/prop-types': 'off',
    'react/jsx-fragments': 'error',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/refs': 'off',

    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
  },
});
