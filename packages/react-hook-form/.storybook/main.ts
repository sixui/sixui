import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials',
    'storybook-dark-mode',
    './addon-react-hook-form/preset',
  ],
  framework: '@storybook/react-vite',
  typescript: {
    reactDocgen: false,
  },
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
    enableCrashReports: false,
  },
};

export default config;
