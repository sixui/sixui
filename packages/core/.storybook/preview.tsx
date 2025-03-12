import type { Decorator, Preview } from '@storybook/react';

import { chromaticModes } from './chromaticModes';
import { SixuiProviderDecorator } from './decorators';

import './storybook.css';
import '~/styles/index.css';

const preview: Preview = {
  parameters: {
    // https://github.com/storybookjs/storybook/issues/17098#issuecomment-1049679681
    docs: {
      source: {
        type: 'code',
      },
    },
    // actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      controls: {
        expanded: true,
      },
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    chromatic: {
      modes: chromaticModes,
      disableAutoSnapshot: true,
    },
    // This allows custom storybook body padding.
    layout: 'none',
  },
};

export const decorators: Array<Decorator> = [SixuiProviderDecorator];

export default preview;
