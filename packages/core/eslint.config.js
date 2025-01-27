import base from '@sixui/eslint-config/react';

export default [
  ...base,
  {
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: './tsconfig.eslint.json',
      },
    },
  },
];
