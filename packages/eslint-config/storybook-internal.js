import storybook from 'eslint-plugin-storybook';

import base from './react-internals.js';

/**
 * A custom ESLint configuration for libraries that use Storybook.
 */
export const config = [
  ...base,
  // https://github.com/storybookjs/eslint-plugin-storybook?tab=readme-ov-file#configuration-eslintconfigcmjs
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.stories.tsx'],

    rules: {
      'import-x/no-default-export': 'off',
    },
  },
];
