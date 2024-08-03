import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';

export const colorSchemeProviderStyles = stylex.create({
  host: {
    color: colorSchemeTokens.onSurface,
    scrollbarColor: {
      '@media (pointer: fine)': `${colorSchemeTokens.primary} transparent`,
    },
  },
  container$light: {
    colorScheme: 'light',
  },
  container$dark: {
    colorScheme: 'dark',
  },
});
