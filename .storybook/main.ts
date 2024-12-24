import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    // reactDocgen: 'react-docgen-typescript',
    reactDocgen: false,
  },
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
};

export default config;
