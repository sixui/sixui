// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import base from '@sixui/eslint-config/storybook';
import storybook from 'eslint-plugin-storybook';

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
  ...storybook.configs['flat/recommended'],
];
