import type { Decorator, Preview } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import { ThemeProvider } from '@/components/utils/Theme';
import { ColorSchemeProvider } from '@/components/utils/ColorScheme';
import { modes } from './modes';

import { theme } from '@/themes/base';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { darkColorRoles } from '@/themes/base/vars/darkColorRoles';

// For theme variant
// import { colorPalettesTheme as variantColorPalettesTheme } from '@/themes/variant/colorPalettes.stylex';
// import { shapeTheme as variantShapeTheme } from '@/themes/variant/shape.stylex';
// import { componentVars as buttonVars } from '@/themes/base/Button/Button.stylex';
// import { componentVars as disclosureButtonVars } from '@/themes/base/DisclosureButton/DisclosureButton.stylex';
// import { avatarTokens } from '@/components/atoms/Avatar/Avatar.stylex';

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
        { name: 'light', value: colorRolesVars.surface },
        { name: 'dark', value: darkColorRoles.surface },
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
    backgroundColor: colorRolesVars.surface,
    padding: '2rem',
    width: '100%',
  },
});

// const componentsStyles = stylex.create({
//   Button: {
//     [buttonVars.containerShape]: '0',
//   },
//   DisclosureButton: {
//     [disclosureButtonVars.containerShape]: '0',
//   },
//   Avatar: {
//     [avatarTokens.containerShape]: '0',
//   },
// });

export const decorators: Array<Decorator> = [
  (Story, context) => {
    const showLightMode = !context.tags.includes('dark-mode-only');
    const showDarkMode = !context.tags.includes('light-mode-only');

    return (
      <ThemeProvider
        theme={theme}
        // colorPalettesTheme={variantColorPalettesTheme}
        // shapeTheme={variantShapeTheme}
        // componentsStyles={componentsStyles}
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
