import type { Decorator, Preview } from '@storybook/react';

import { ReactHookFormDecorator } from './addon-react-hook-form/decorators';
import { SixuiProviderDecorator } from './decorators';

import './storybook.css';
import '@sixui/core/styles.css';

const preview: Preview = {
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators: Array<Decorator> = [
  ReactHookFormDecorator,
  SixuiProviderDecorator,
];

export default preview;
