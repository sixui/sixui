import globals from 'globals';

import base from './base.js';

export default [
  ...base,
  {
    files: ['*.js'],

    languageOptions: {
      globals: globals.node,
    },

    rules: {
      'import-x/no-default-export': 'off',
    },
  },
];
