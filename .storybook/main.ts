import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials',
    'storybook-addon-pseudo-states',
    '@storybook/addon-interactions', // TODO: make use of addon-interactions
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
