import type { Decorator, Preview } from '@storybook/react';

import { ThemeProvider } from '~/components/ThemeProvider';
import {
  ColorSchemeProvider,
  colorSchemeTokens,
} from '~/components/ColorScheme';
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
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: colorSchemeTokens.surfaceContainerLowest },
        {
          name: 'dark',
          value: colorSchemeTokens.surfaceContainerHighest,
        },
      ],
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
      <ThemeProvider
      // theme={variantTheme}
      >
        {/* <ThemeControls> */}
        {showLightMode ? (
          <ColorSchemeProvider variant='light'>
            <div className={styles.storyWrapper}>
              <Story />
            </div>
          </ColorSchemeProvider>
        ) : null}

        {showDarkMode ? (
          <ColorSchemeProvider variant='dark'>
            <div className={styles.storyWrapper}>
              <Story />
            </div>
          </ColorSchemeProvider>
        ) : null}
        {/* </ThemeControls> */}
      </ThemeProvider>
    );
  },
];

// eslint-disable-next-line import/no-default-export
export default preview;
