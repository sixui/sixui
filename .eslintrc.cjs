/** @type { import("eslint").Linter.Config } */
const eslintConfig = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@stylexjs/eslint-plugin', 'fp', 'eslint-plugin-tsdoc', 'cypress'],
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:storybook/recommended',
    'plugin:cypress/recommended',
  ],
  settings: {
    'import/extensions': 'always',
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    curly: 'error',
    'tsdoc/syntax': 'warn',
    '@stylexjs/valid-styles': 'error',
    'import/no-default-export': 'error',
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
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
    'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
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
    'import/export': 'error',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-curly-newline': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
  overrides: [
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['**/*.tsx', '**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: [
          './tsconfig.json',
          './tsconfig.node.json',
          './tsconfig.app.json',
        ],
        tsconfigRootDir: __dirname,
      },
      extends: [
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],
      rules: {
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksConditionals: true,
            checksSpreads: true,
            checksVoidReturn: {
              arguments: true,
              attributes: false, // slow
              properties: true,
              returns: true,
              variables: true,
            },
          },
        ],
        '@typescript-eslint/no-unsafe-assignment': 'off', // slow
        '@typescript-eslint/prefer-nullish-coalescing': [
          'error',
          {
            ignorePrimitives: {
              boolean: true,
            },
          },
        ],
        // '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-definitions': 0,
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
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'react/prop-types': 'off',
        'react/jsx-fragments': 'error',
        '@typescript-eslint/array-type': ['error', { default: 'generic' }],
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
            format: [
              'camelCase',
              'PascalCase', // for React components
              'UPPER_CASE', // for constants
            ],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'class',
            format: ['PascalCase'],
          },
        ],
      },
    },
    {
      files: ['**/*.test.ts'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],
};

// eslint-disable-next-line no-undef
module.exports = eslintConfig;
