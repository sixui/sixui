import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import fpPlugin from 'eslint-plugin-fp';
import eslintPluginImportX from 'eslint-plugin-import-x';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import turboPlugin from 'eslint-plugin-turbo';
import globals from 'globals';
import tseslint, { configs as tseslintConfig } from 'typescript-eslint';

const _dirname = import.meta.dirname;
const compat = new FlatCompat({
  baseDirectory: _dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
});

export default tseslint.config(
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      // 'eslint.config.mjs',
      // 'packages/eslint-config/*.mjs',
    ],
  },
  // https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs
  eslintPluginPrettierRecommended,
  // https://typescript-eslint.io/getting-started#step-2-configuration
  eslint.configs.recommended,
  tseslintConfig.strictTypeChecked,
  tseslintConfig.stylisticTypeChecked,
  // https://github.com/un-ts/eslint-plugin-import-x?tab=readme-ov-file#configuration-new-eslintconfigjs
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  // https://github.com/jsx-eslint/eslint-plugin-react/tree/master?tab=readme-ov-file#flat-configs
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  // https://github.com/storybookjs/eslint-plugin-storybook?tab=readme-ov-file#configuration-eslintconfigcmjs
  ...storybook.configs['flat/recommended'],
  ...fixupConfigRules(compat.extends('plugin:react-hooks/recommended')),
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            '*.js',
            '*.mjs',
            'vite.config.ts',
            'packages/eslint-config/*.js',
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    plugins: {
      fp: fpPlugin,
      tsdoc: tsdocPlugin,
      'jsx-a11y': jsxA11yPlugin,
      turbo: turboPlugin,
    },

    settings: {
      'import-x/extensions': 'always',
      react: {
        version: 'detect',
      },
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

      'turbo/no-undeclared-env-vars': 'warn',

      'tsdoc/syntax': 'warn',

      'import-x/no-default-export': 'error',
      'import-x/export': 'error',

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

      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/media-has-caption': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/no-autofocus': 'off',
      'jsx-a11y/img-redundant-alt': 'off',

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
  {
    files: [
      '**/*.stories.tsx',
      'eslint.config.js',
      'packages/eslint-config/*.js',
    ],

    rules: {
      'import-x/no-default-export': 'off',
    },
  },
);
