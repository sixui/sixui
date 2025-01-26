// eslint-disable-next-line tsdoc/syntax
/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
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

// eslint-disable-next-line import-x/no-default-export
export default config;
