import stylex from '@stylexjs/stylex';

import { appLayoutListDetailBodyTokens } from './AppLayoutListDetailBody.stylex';

export type IAppLayoutListDetailBodyStylesKey =
  keyof typeof appShellListDetailBodyStyles;
export const appShellListDetailBodyStyles = stylex.create({
  host: {
    display: 'grid',
    gap: appLayoutListDetailBodyTokens.spacer,
    paddingLeft: {
      default: appLayoutListDetailBodyTokens.windowHorizontalSpace$compact,
      '@container compact (min-width: 0)':
        appLayoutListDetailBodyTokens.windowHorizontalSpace$compact,
      '@container medium (min-width: 0)':
        appLayoutListDetailBodyTokens.windowHorizontalSpace$medium,
      '@container expanded (min-width: 0)':
        appLayoutListDetailBodyTokens.windowHorizontalSpace$expanded,
      '@container large (min-width: 0)':
        appLayoutListDetailBodyTokens.windowHorizontalSpace$large,
      '@container extraLarge (min-width: 0)':
        appLayoutListDetailBodyTokens.windowHorizontalSpace$extraLarge,
    },
    paddingRight: {
      default: appLayoutListDetailBodyTokens.windowHorizontalSpace$compact,
      '@container compact (min-width: 0)':
        appLayoutListDetailBodyTokens.windowHorizontalSpace$compact,
      '@container medium (min-width: 0)':
        appLayoutListDetailBodyTokens.windowHorizontalSpace$medium,
      '@container expanded (min-width: 0)':
        appLayoutListDetailBodyTokens.windowHorizontalSpace$expanded,
      '@container large (min-width: 0)':
        appLayoutListDetailBodyTokens.windowHorizontalSpace$large,
      '@container extraLarge (min-width: 0)':
        appLayoutListDetailBodyTokens.windowHorizontalSpace$extraLarge,
    },
  },
  host$singlePane: {
    gridTemplateColumns: '1fr',
  },
  host$multiListDetailBody: {
    gridTemplateColumns: {
      default: 'none',
      '@container compact (min-width: 0)': '1fr',
      '@container medium (min-width: 0)': '1fr',
      '@container expanded (min-width: 0)': '360px 1fr',
      '@container large (min-width: 0)': '412px 1fr',
      '@container extraLarge (min-width: 0)': '412px 1fr',
    },
  },
  host$multiListDetailBody$fixedTrailing: {
    gridTemplateColumns: {
      default: 'none',
      '@container compact (min-width: 0)': '1fr',
      '@container medium (min-width: 0)': '1fr',
      '@container expanded (min-width: 0)': '1fr 360px',
      '@container large (min-width: 0)': '1fr 412px',
      '@container extraLarge (min-width: 0)': '1fr 412px',
    },
  },
});
