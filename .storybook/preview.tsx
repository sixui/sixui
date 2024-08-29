import type { Decorator, Preview } from '@storybook/react';

import { ThemeProvider } from '~/components/ThemeProvider';
import { modes } from './modes';

// import variantTheme from '~/themes/variant/theme.json';
// import { ThemeControls } from './ThemeControls';
import * as styles from './preview.css';
import { Avatar } from '~/components/Avatar';

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
  },
};

export const decorators: Array<Decorator> = [
  (Story, context) => {
    const showLightMode = !context.tags.includes('dark-mode-only');
    const showDarkMode = !context.tags.includes('light-mode-only');

    return (
      <>
        {showLightMode ? (
          <ThemeProvider
            // theme={variantTheme}
            theme={{
              tokens: {
                colorScheme: {
                  light: {
                    primaryContainer: 'red',
                  },
                },
              },
              components: {
                Avatar: Avatar.extend({
                  defaultProps: {
                    children: '☀️',
                  },
                  classNames: {
                    root: styles.testVariant,
                  },
                }),
              },
            }}
            colorSchemeVariant='light'
            className={styles.storyWrapper}
          >
            <Story />
          </ThemeProvider>
        ) : null}

        {showDarkMode ? (
          <ThemeProvider
            // theme={variantTheme}
            colorSchemeVariant='dark'
            className={styles.storyWrapper}
          >
            <Story />
          </ThemeProvider>
        ) : null}
      </>
    );
  },
];

// eslint-disable-next-line import/no-default-export
export default preview;
