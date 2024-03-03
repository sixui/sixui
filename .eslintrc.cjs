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
  plugins: ['@stylexjs/eslint-plugin', 'fp', 'eslint-plugin-tsdoc'],
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
  ],
  settings: {
    'import/extensions': 'always',
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: [
          '.tsx',
          '.ts',
          '.styledefs.ts',
          '.styles.ts',
          '.stylex.ts',
          '.svg',
          '.json',
        ],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
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
    'import/no-unresolved': [
      'error',
      {
        commonjs: true,
        amd: true,
      },
    ],
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
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
        project: './tsconfig.json',
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
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
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'error',
        '@typescript-eslint/typedef': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',
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
            prefix: ['I', 'T'],
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
  ],
};

// eslint-disable-next-line no-undef
module.exports = eslintConfig;
