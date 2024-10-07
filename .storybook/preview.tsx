import type { Decorator, Preview } from '@storybook/react';

import { Avatar } from '~/components/Avatar';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { SixuiProvider } from '~/components/SixuiProvider';
import { StateLayer } from '~/components/StateLayer';
import { ThemeProvider } from '~/components/ThemeProvider';
import { modes } from './modes';
// import variantTheme from '~/themes/variant/theme.json';
// import { ThemeControls } from './ThemeControls';
import * as styles from './preview.css';

import '~/styles/main.css';
import '~/styles/storybook.css';

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
            IndeterminateCircularProgressIndicator:
              IndeterminateCircularProgressIndicator.extend({
                classNames: {
                  // root: styles.testBorder,
                },
              }),
            Avatar: Avatar.extend({
              defaultProps: {
                children: '☀️',
                outline: '$md',
                outlineStyle: 'solid',
                outlineColor: '$primary',
              },
              classNames: {
                root: styles.testVariant,
              },
            }),
            StateLayer: StateLayer.extend({
              classNames: {
                // root: styles.testBorder,
              },
            }),
          },
        }}
        colorSchemeVariant="light"
      >
        {showLightMode ? (
          <ThemeProvider
            // theme={variantTheme}
            className={styles.storyWrapper}
          >
            <Story />
          </ThemeProvider>
        ) : null}

        {showDarkMode ? (
          <ThemeProvider
            // theme={variantTheme}
            colorSchemeVariant="dark"
            className={styles.storyWrapper}
          >
            <Story />
          </ThemeProvider>
        ) : null}
      </SixuiProvider>
    );
  },
];

// eslint-disable-next-line import/no-default-export
export default preview;
