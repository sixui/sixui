import base from '@sixui/eslint-config/storybook';

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
