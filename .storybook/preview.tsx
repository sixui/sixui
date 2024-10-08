import type { Decorator, Preview } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import { ThemeProvider } from '~/components/Theme';
import { ColorSchemeProvider } from '~/components/ColorScheme';
import { modes } from './modes';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { darkColorScheme } from '~/themes/base/darkColorScheme.styles';
import { spacingTokens } from '~/themes/base/spacing.stylex';
// import variantTheme from '~/themes/variant/theme.json';
import { ThemeControls } from './ThemeControls';

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
        { name: 'dark', value: darkColorScheme.surfaceContainerLowest },
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
    backgroundColor: colorSchemeTokens.surfaceContainerLowest,
    padding: spacingTokens.padding$6,
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
        <ThemeControls>
          {showLightMode ? (
            <ColorSchemeProvider variant='light'>
              <div {...stylex.props(styles.storyWrapper)}>
                <Story />
              </div>
            </ColorSchemeProvider>
          ) : null}

          {showDarkMode ? (
            <ColorSchemeProvider variant='dark'>
              <div {...stylex.props(styles.storyWrapper)}>
                <Story />
              </div>
            </ColorSchemeProvider>
          ) : null}
        </ThemeControls>
      </ThemeProvider>
    );
  },
];

// eslint-disable-next-line import/no-default-export
export default preview;
