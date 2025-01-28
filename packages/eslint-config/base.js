import eslint from '@eslint/js';
import fpPlugin from 'eslint-plugin-fp';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import turboPlugin from 'eslint-plugin-turbo';

/**
 * A shared ESLint configuration for JS files.
 */
export default [
  // https://typescript-eslint.io/getting-started#step-2-configuration
  eslint.configs.recommended,
  // https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs
  eslintPluginPrettierRecommended,
  // https://github.com/un-ts/eslint-plugin-import-x?tab=readme-ov-file#configuration-new-eslintconfigjs
  eslintPluginImportX.flatConfigs.recommended,
  {
    ignores: ['**/dist'],
  },
  {
    plugins: {
      fp: fpPlugin,
      turbo: turboPlugin,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      'import-x/extensions': 'always',
      'import-x/resolver': { typescript: true },
    },
    rules: {
      curly: 'error',
      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],
      'no-console': 'error',
      'no-alert': 'error',
      'no-bitwise': 'error',
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['draft'],
        },
      ],
      'no-unused-expressions': [
        'error',
        {
          allowTaggedTemplates: true,
        },
      ],
      'no-continue': 'error',
      'no-warning-comments': [
        'error',
        {
          terms: ['dev', 'fixme'],
          location: 'start',
        },
      ],
      'no-nested-ternary': 'off',
      'implicit-arrow-linebreak': 'off',
      'operator-linebreak': 'off',
      'object-curly-newline': 'off',
      'function-paren-newline': 'off',
      'no-confusing-arrow': 'off',

      'turbo/no-undeclared-env-vars': 'warn',

      'import-x/no-default-export': 'error',
      'import-x/export': 'error',

      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true,
        },
      ],
    },
  },
  {
    files: ['eslint.config.*', 'vite.config.*', 'prettier.config/*'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
];
