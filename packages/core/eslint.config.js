import base from '@sixui/eslint-config/react';
import globals from 'globals';

export default [
  ...base,
  {
    files: ['rollup.config.js'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
];
