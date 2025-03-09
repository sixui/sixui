import type { Decorator, Preview } from '@storybook/react';

import './styles.css';
import '@sixui/core/styles.css';

import { SixuiProvider } from '@sixui/core';

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
  },
};

export const decorators: Array<Decorator> = [
  (Story) => (
    <SixuiProvider
      colorSchemeVariant="light"
      theme={{
        tokens: {
          typeFace: {
            plain: 'Roboto',
            brand: 'Roboto',
          },
        },
      }}
    >
      <Story />
    </SixuiProvider>
  ),
];

export default preview;
