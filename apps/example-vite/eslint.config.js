import base from '@sixui/eslint-config/vite';

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
