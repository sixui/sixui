import type { StorybookConfig } from '@storybook/react-vite';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);

const getAbsolutePath = (value: string): string =>
  dirname(require.resolve(join(value, 'package.json')));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    // TODO: migrate to storybook 9
    // getAbsolutePath('storybook-dark-mode'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: getAbsolutePath('@storybook/react-vite'),
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
