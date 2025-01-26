import base from '@sixui/eslint-config/typescript';
import globals from 'globals';

export default [
  ...base,
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: false,
        project: './tsconfig.eslint.json',
      },
    },
  },
  { ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}'] },
];
