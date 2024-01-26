import type { Decorator, Preview } from '@storybook/react';
import * as stylex from '@stylexjs/stylex';

import { modes } from './modes';
import { ThemeProvider } from '@/helpers/ThemeProvider';

import { theme } from '@/themes/base';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import {
  darkColorRoles,
  darkColorRolesTheme,
} from '@/themes/base/vars/darkColorsRoles';

// For theme variant
// import { theme } from '@/themes/variant';
// import { colorRolesTheme } from '@/themes/base/vars/colorRoles.stylex';
// import { colorPaletteTheme } from '@/themes/variant/vars/colorPalettes.stylex';
// import { shapeTheme } from '@/themes/variant/vars/shape.stylex';

import 'modern-normalize/modern-normalize.css';
import '@/styles.css';

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
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: colorRolesVars.surface },
        { name: 'dark', value: darkColorRoles.surface },
      ],
    },
    chromatic: { modes },
    // This allows custom storybook body padding.
    layout: 'none',
    pseudo: {
      hover: ['[data-hovered]'],
      focus: ['[data-focused]'],
      active: ['[data-pressed]'],
    },
  },
};

export const styles = stylex.create({
  container: {
    backgroundColor: colorRolesVars.surface,
    padding: '2rem',
  },
  container$light: {
    colorScheme: 'light',
  },
  container$dark: {
    colorScheme: 'dark',
  },
});

export const decorators: Array<Decorator> = [
  (Story, context) => {
    const showLightMode = !context.tags.includes('dark-mode-only');
    const showDarkMode = !context.tags.includes('light-mode-only');

    return (
      <ThemeProvider value={{ theme }}>
        {/* <div {...stylex.props(colorPaletteTheme, colorRolesTheme, shapeTheme)}> */}
        {showLightMode ? (
          <div {...stylex.props(styles.container, styles.container$light)}>
            <Story theme='light' />
          </div>
        ) : null}

        {showDarkMode ? (
          <div
            {...stylex.props(
              darkColorRolesTheme,
              styles.container,
              styles.container$dark,
            )}
          >
            <Story theme='dark' />
          </div>
        ) : null}
        {/* </div> */}
      </ThemeProvider>
    );
  },
];

export default preview;
