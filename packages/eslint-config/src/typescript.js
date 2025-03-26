import eslintPluginImportX from 'eslint-plugin-import-x';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import tseslint, { configs as tseslintConfig } from 'typescript-eslint';

import base from './base.js';

const CWD = process.cwd();

// eslint-disable-next-line no-console
console.log('[eslint] Using CWD:', CWD);

/**
 * A custom ESLint configuration for TS files.
 */
export default tseslint.config(...base, {
  files: ['**/*.ts', '**/*.tsx'],
  extends: [
    // https://typescript-eslint.io/getting-started#step-2-configuration
    tseslintConfig.strictTypeChecked,
    tseslintConfig.stylisticTypeChecked,
    // https://github.com/un-ts/eslint-plugin-import-x?tab=readme-ov-file#configuration-new-eslintconfigjs
    eslintPluginImportX.flatConfigs.typescript,
  ],
  plugins: {
    tsdoc: tsdocPlugin,
  },
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: CWD,
    },
  },
  rules: {
    'tsdoc/syntax': 'warn',

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
    '@typescript-eslint/no-unnecessary-type-parameters': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': [
      'error',
      {
        ignorePrimitives: true,
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
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
      {
        selector: 'enum',
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
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowBoolean: true,
        allowNumber: true,
      },
    ],
  },
});
