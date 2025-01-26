import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

import base from './react.js';

/**
 * A custom ESLint configuration for libraries that use Storybook.
 */
export default tseslint.config(
  ...base,
  // https://github.com/storybookjs/eslint-plugin-storybook?tab=readme-ov-file#configuration-eslintconfigcmjs
  storybook.configs['flat/recommended'],
  {
    files: ['*.stories.tsx'],

    rules: {
      'import-x/no-default-export': 'off',
    },
  },
);
