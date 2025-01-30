import type { Decorator, Preview } from '@storybook/react';

import { modes } from './modes';
import { classNames } from './preview.css';

import './storybook.css';

import { Box } from '~/components/Box';
import { CustomizableTheme } from '~/components/CustomizableTheme';
import { SixuiProvider } from '~/components/SixuiProvider';
import { ThemeProvider } from '~/components/ThemeProvider';

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
    chromatic: { modes },
    // This allows custom storybook body padding.
    layout: 'none',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#141316' }],
    },
  },
};

export const decorators: Array<Decorator> = [
  (Story, context) => {
    const showLightMode = !context.tags.includes('dark-mode-only');
    const showDarkMode = !context.tags.includes('light-mode-only');

    return (
      <SixuiProvider colorSchemeVariant="light">
        <CustomizableTheme>
          <Box w="100%">
            {showLightMode && (
              <ThemeProvider className={classNames.storyWrapper} inherit>
                <Story />
              </ThemeProvider>
            )}

            {showDarkMode && (
              <ThemeProvider
                colorSchemeVariant="dark"
                className={classNames.storyWrapper}
                inherit
              >
                <Story />
              </ThemeProvider>
            )}
          </Box>
        </CustomizableTheme>
      </SixuiProvider>
    );
  },
];

export default preview;
