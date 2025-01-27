import base from '@sixui/eslint-config/typescript';
import globals from 'globals';

export default [
  ...base,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
];
