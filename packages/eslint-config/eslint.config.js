import globals from 'globals';

import base from './src/base.js';

export default [
  ...base,
  {
    files: ['src/*.js'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
];
