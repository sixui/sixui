import type { Decorator, Preview } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import { ThemeProvider } from '@/components/Theme';
import { ColorSchemeProvider } from '@/components/ColorScheme';
import { modes } from './modes';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { darkColorRolesVars } from '@/themes/base/darkColorRoles.styles';

// For theme variant
// import { colorPalettesTheme as variantColorPalettesTheme } from '@/themes/variant/colorPalettes.stylex';
// import { shapeTheme as variantShapeTheme } from '@/themes/variant/shape.stylex';
// import { buttonTokens } from '@/components/Button/Button.stylex';
// import { disclosureButtonTokens } from '@/components/DisclosureButton/DisclosureButton.stylex';
// import { avatarTokens } from '@/components/Avatar/Avatar.stylex';
// import { badgeTokens } from '@/components/Badge/Badge.stylex';
// import { checkboxTokens } from '@/components/Checkbox/Checkbox.stylex';

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
        { name: 'light', value: colorRolesTokens.surface },
        { name: 'dark', value: darkColorRolesVars.surface },
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
    backgroundColor: colorRolesTokens.surface,
    padding: '2rem',
    width: '100%',
  },
});

// const componentsStyles = stylex.create({
//   Button: {
//     [buttonTokens.containerShape]: '0',
//   },
//   DisclosureButton: {
//     [disclosureButtonTokens.containerShape]: '0',
//   },
//   Avatar: {
//     [avatarTokens.containerShape]: '0',
//   },
//   Badge: {
//     [badgeTokens.containerShape]: '0',
//   },
//   Checkbox: {
//     [checkboxTokens.containerShape]: '999px',
//   },
// });

export const decorators: Array<Decorator> = [
  (Story, context) => {
    const showLightMode = !context.tags.includes('dark-mode-only');
    const showDarkMode = !context.tags.includes('light-mode-only');

    return (
      <ThemeProvider
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
