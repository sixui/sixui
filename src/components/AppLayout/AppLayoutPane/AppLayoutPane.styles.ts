import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';

export type IAppLayoutPaneStylesKey = keyof typeof appLayoutPaneStyles;
export const appLayoutPaneStyles = stylex.create({
  host: {
    margin: {
      default: 'unset',
      // '@container compact (min-width: 0)': spacingTokens.padding$4,
      // '@container mediumAndUp (min-width: 0)': spacingTokens.padding$6,
      // TODO: use better media queries
      '@media (min-width: 0) and (max-width: 599)': spacingTokens.padding$4,
      '@media (min-width: 600)': spacingTokens.padding$6,
    },
    flexGrow: 1,
  },
});
