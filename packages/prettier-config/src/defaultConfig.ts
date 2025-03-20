import type { PrettierConfig } from '@ianvs/prettier-plugin-sort-imports';

export const defaultConfig: PrettierConfig = {
  singleQuote: true,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: 'all',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  tabWidth: 2,
  importOrder: [
    '<TYPES>',
    '^react$',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '<TYPES>^~',
    '<TYPES>^\\.\\./',
    '<TYPES>^\\./',
    '^~/(?!.*\\.css$).*$',
    '^~/.*\\.css$',
    '^\\.\\./(?!.*\\.css$).*$',
    '^\\.\\./.*\\.css$',
    '^\\./(?!.*\\.css$).*$',
    '^\\./.*\\.css$',
  ],
};
