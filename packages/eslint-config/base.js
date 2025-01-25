import eslint from '@eslint/js';
import fpPlugin from 'eslint-plugin-fp';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint, { configs as tseslintConfig } from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 */
export default tseslint.config(
  // https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs
  eslintPluginPrettierRecommended,
  // https://typescript-eslint.io/getting-started#step-2-configuration
  eslint.configs.recommended,
  tseslintConfig.strictTypeChecked,
  tseslintConfig.stylisticTypeChecked,
  // https://github.com/un-ts/eslint-plugin-import-x?tab=readme-ov-file#configuration-new-eslintconfigjs
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  {
    ignores: ['**/dist', '**/eslint.config.js', 'packages/eslint-config/*.js'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      fp: fpPlugin,
      tsdoc: tsdocPlugin,
      turbo: turboPlugin,
    },
    settings: {
      'import-x/extensions': 'always',
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

      'tsdoc/syntax': 'warn',

      'import-x/no-default-export': 'error',
      'import-x/export': 'error',

      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true,
        },
      ],

      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksConditionals: true,
          checksSpreads: true,

          checksVoidReturn: {
            arguments: true,
            attributes: false,
            properties: true,
            returns: true,
            variables: true,
          },
        },
      ],
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        {
          ignorePrimitives: {
            boolean: true,
          },
        },
      ],
      '@typescript-eslint/consistent-type-definitions': 0,
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic',
        },
      ],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/typedef': 'error',
      '@typescript-eslint/no-inferrable-types': [
        'error',
        {
          ignoreParameters: true,
          ignoreProperties: true,
        },
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          prefix: ['T'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'forbid',
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
);
