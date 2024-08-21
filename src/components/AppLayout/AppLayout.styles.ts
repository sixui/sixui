import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';

export type IAppLayoutStylesKey = keyof typeof appLayoutStyles;
export const appLayoutStyles = stylex.create({
  host: {
    backgroundColor: colorSchemeTokens.surface,
    // height: '100%',
  },
});
