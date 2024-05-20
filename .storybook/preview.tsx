import type { Decorator, Preview } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { themes } from '@storybook/theming';

import { ThemeProvider } from '@/components/utils/Theme';
import { ColorSchemeProvider } from '@/components/utils/ColorScheme';
import { modes } from './modes';

import { theme } from '@/themes/base';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { darkColorRoles } from '@/themes/base/vars/darkColorsRoles';

// For theme variant
// import { theme } from '@/themes/variant';
// import { colorRolesTheme } from '@/themes/base/vars/colorRoles.stylex';
// import { colorPaletteTheme } from '@/themes/variant/vars/colorPalettes.stylex';
// import { shapeTheme } from '@/themes/variant/vars/shape.stylex';

import '@/styles/main.css';
import '@/styles/storybook.css';

const preview: Preview = {
  parameters: {
    // https://github.com/storybookjs/storybook/issues/17098#issuecomment-1049679681
    docs: {
      theme: themes.dark,
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
        { name: 'light', value: colorRolesVars.surface },
        { name: 'dark', value: darkColorRoles.surface },
      ],
    },
    chromatic: { modes },
    // This allows custom storybook body padding.
    layout: 'none',
  },
};

export const styles = stylex.create({
  storyWrapper: {
    backgroundColor: colorRolesVars.surface,
    padding: '2rem',
    width: '100%',
  },
});

export const decorators: Array<Decorator> = [
  (Story, context) => {
    const showLightMode = !context.tags.includes('dark-mode-only');
    const showDarkMode = !context.tags.includes('light-mode-only');

    return (
      <ThemeProvider theme={theme}>
        {/* <div {...stylex.props(colorPaletteTheme, colorRolesTheme, shapeTheme)}> */}
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
        {/* </div> */}
      </ThemeProvider>
    );
  },
];

// eslint-disable-next-line import/no-default-export
export default preview;
