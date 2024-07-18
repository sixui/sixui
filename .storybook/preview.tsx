import type { Decorator, Preview } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import { ThemeProvider } from '@/components/Theme';
import { ColorSchemeProvider } from '@/components/ColorScheme';
import { modes } from './modes';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { darkColorScheme } from '@/themes/base/darkColorScheme.styles';
// import variantTheme from '@/themes/variant/theme.json';

import '@/styles/main.css';
import '@/styles/storybook.css';

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
        { name: 'light', value: colorSchemeTokens.surface },
        { name: 'dark', value: darkColorScheme.surface },
      ],
    },
    chromatic: { modes },
    // This allows custom storybook body padding.
    layout: 'none',
  },
};

const styles = stylex.create({
  storyWrapper: {
    position: 'relative',
    backgroundColor: colorSchemeTokens.surface,
    padding: '2rem',
    width: '100%',
  },
});

export const decorators: Array<Decorator> = [
  (Story, context) => {
    const showLightMode = !context.tags.includes('dark-mode-only');
    const showDarkMode = !context.tags.includes('light-mode-only');

    return (
      <ThemeProvider
      // theme={variantTheme}
      >
        {showLightMode ? (
          <ColorSchemeProvider scheme='light'>
            <div {...stylex.props(styles.storyWrapper)}>
              <Story />
            </div>
          </ColorSchemeProvider>
        ) : null}

        {showDarkMode ? (
          <ColorSchemeProvider scheme='dark'>
            <div {...stylex.props(styles.storyWrapper)}>
              <Story />
            </div>
          </ColorSchemeProvider>
        ) : null}
      </ThemeProvider>
    );
  },
];

// eslint-disable-next-line import/no-default-export
export default preview;
