import stylex from '@stylexjs/stylex';

import { appLayoutPanesTokens } from './AppLayoutPanes.stylex';

export type IAppLayoutPanesStylesKey = keyof typeof appShellPanesStyles;
export const appShellPanesStyles = stylex.create({
  host: {
    display: 'grid',
    gap: appLayoutPanesTokens.spacer,
    paddingLeft: {
      default: appLayoutPanesTokens.windowHorizontalSpace$compact,
      '@container compact (min-width: 0)':
        appLayoutPanesTokens.windowHorizontalSpace$compact,
      '@container medium (min-width: 0)':
        appLayoutPanesTokens.windowHorizontalSpace$medium,
      '@container expanded (min-width: 0)':
        appLayoutPanesTokens.windowHorizontalSpace$expanded,
      '@container large (min-width: 0)':
        appLayoutPanesTokens.windowHorizontalSpace$large,
      '@container extraLarge (min-width: 0)':
        appLayoutPanesTokens.windowHorizontalSpace$extraLarge,
    },
    paddingRight: {
      default: appLayoutPanesTokens.windowHorizontalSpace$compact,
      '@container compact (min-width: 0)':
        appLayoutPanesTokens.windowHorizontalSpace$compact,
      '@container medium (min-width: 0)':
        appLayoutPanesTokens.windowHorizontalSpace$medium,
      '@container expanded (min-width: 0)':
        appLayoutPanesTokens.windowHorizontalSpace$expanded,
      '@container large (min-width: 0)':
        appLayoutPanesTokens.windowHorizontalSpace$large,
      '@container extraLarge (min-width: 0)':
        appLayoutPanesTokens.windowHorizontalSpace$extraLarge,
    },
  },
  host$singlePane: {
    gridTemplateColumns: '1fr',
  },
  host$multiPanes: {
    gridTemplateColumns: {
      default: 'none',
      '@container compact (min-width: 0)': '1fr',
      '@container medium (min-width: 0)': '1fr',
      '@container expanded (min-width: 0)': '360px 1fr',
      '@container large (min-width: 0)': '412px 1fr',
      '@container extraLarge (min-width: 0)': '412px 1fr',
    },
  },
});
