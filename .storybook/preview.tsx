import type { Decorator, Preview } from '@storybook/react';

import { Avatar } from '~/components/Avatar';
import { SixuiProvider } from '~/components/SixuiProvider';
import { ThemeProvider } from '~/components/ThemeProvider';
import { modes } from './modes';
// import variantTheme from '~/themes/variant/theme.json';
import * as styles from './preview.css';

import '~/styles/main.css';
import '~/styles/storybook.css';

import { Box } from '~/components/Box';
import { Button } from '~/components/Button';
import { CustomizableTheme } from '~/components/CustomizableTheme';

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
      <SixuiProvider
        // FIXME: delete
        theme={{
          tokens: {
            colorScheme: {
              light: {
                // primaryContainer: 'blue',
                // onPrimaryContainer: 'white',
              },
              dark: {
                // primaryContainer: 'green',
                // onPrimaryContainer: 'white',
              },
            },
          },
          components: {
            // IndeterminateCircularProgressIndicator:
            //   IndeterminateCircularProgressIndicator.extend({
            //     classNames: {
            //       // root: styles.testBorder,
            //     },
            //   }),
            Avatar: Avatar.extend({
              // defaultProps: {
              //   children: '☀️',
              //   outline: '$md',
              //   outlineStyle: 'solid',
              //   outlineColor: '$primary',
              // },
              classNames: {
                root: styles.avatarTheme,
              },
            }),
            Button: Button.extend({
              classNames: {
                root: styles.buttonTheme,
              },
            }),
            // StateLayer: StateLayer.extend({
            //   classNames: {
            //     // root: styles.testBorder,
            //   },
            // }),
          },
        }}
        colorSchemeVariant="light"
      >
        <CustomizableTheme>
          <Box w="100%">
            {showLightMode && (
              <ThemeProvider
                // theme={variantTheme}
                className={styles.storyWrapper}
                inherit
              >
                <Story />
              </ThemeProvider>
            )}

            {showDarkMode && (
              <ThemeProvider
                // theme={variantTheme}
                colorSchemeVariant="dark"
                className={styles.storyWrapper}
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
