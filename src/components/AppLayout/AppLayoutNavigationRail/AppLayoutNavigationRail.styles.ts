import stylex from '@stylexjs/stylex';

import { outlineTokens } from '~/themes/base/outline.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { appLayoutTokens } from '../AppLayout.stylex';

export type IAppLayoutNavigationRailStylesKey =
  keyof typeof appLayoutNavigationRailStyles;
export const appLayoutNavigationRailStyles = stylex.create({
  host: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: appLayoutTokens.navigationRailWidth,
  },
  // host$hasHeader$opened: {
  //   height: `calc(100vh - ${appLayoutTokens.headerHeight})`,
  //   top: appLayoutTokens.headerHeight,
  // },
  // host$fullHeight: {
  //   height: '100vh',
  //   top: 0,
  // },
  inner: {
    height: '100%',
  },
});
