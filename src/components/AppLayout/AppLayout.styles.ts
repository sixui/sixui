import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';

export type IAppLayoutStylesKey = keyof typeof appShellStyles;
export const appShellStyles = stylex.create({
  host: {
    backgroundColor: colorSchemeTokens.surface,
  },
});
