import type { Decorator, Preview } from '@storybook/react';

import { modes } from './modes';
import { classNames } from './preview.css';

import './storybook.css';
import '~/styles/index.css';

import { CustomizableTheme } from '~/components/CustomizableTheme';
import { Flex } from '~/components/Flex';
import { SixuiProvider } from '~/components/Sixui';
import { ThemeProvider } from '~/components/Theme';

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
      modes,
      disableAutoSnapshot: true,
    },
    // This allows custom storybook body padding.
    layout: 'none',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0F0D13' }],
    },
  },
};

export const decorators: Array<Decorator> = [
  (Story, context) => {
    const showLightMode = !context.tags.includes('dark-mode-only');
    const showDarkMode = !context.tags.includes('light-mode-only');

    return (
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
        <CustomizableTheme>
          <Flex direction="column" className={classNames.wrapper}>
            {showLightMode && (
              <ThemeProvider inherit>
                <div className={classNames.storyWrapper}>
                  <Story />
                </div>
              </ThemeProvider>
            )}

            {showDarkMode && (
              <ThemeProvider colorSchemeVariant="dark" inherit>
                <div className={classNames.storyWrapper}>
                  <Story />
                </div>
              </ThemeProvider>
            )}
          </Flex>
        </CustomizableTheme>
      </SixuiProvider>
    );
  },
];

export default preview;
