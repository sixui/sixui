import stylex from '@stylexjs/stylex';

import { appLayoutTokens } from '../AppLayout.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

export type IAppLayoutBodyStylesKey = keyof typeof appLayoutBodyStyles;
export const appLayoutBodyStyles = stylex.create({
  host: {
    flexGrow: 1,
    minHeight: '100vh',
    gap: {
      default: 'unset',
      // '@container compact (min-width: 0)': spacingTokens.padding$4,
      // '@container mediumAndUp (min-width: 0)': spacingTokens.padding$6,
      // TODO: use better media queries
      '@media (min-width: 0) and (max-width: 599)': spacingTokens.padding$4,
      '@media (min-width: 600)': spacingTokens.padding$6,
    },
    marginInline: {
      default: 'unset',
      // '@container compact (min-width: 0)': spacingTokens.padding$4,
      // '@container mediumAndUp (min-width: 0)': spacingTokens.padding$6,
      // TODO: use better media queries
      '@media (min-width: 0) and (max-width: 599)': spacingTokens.padding$4,
      '@media (min-width: 600)': spacingTokens.padding$6,
    },
  },
  host$hasAside: {
    marginRight: 0,
  },
  host$hasHeader: {
    minHeight: `calc(100vh - ${appLayoutTokens.headerHeight})`,
  },
});
