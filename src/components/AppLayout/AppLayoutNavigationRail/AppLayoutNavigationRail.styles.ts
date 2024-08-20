import stylex from '@stylexjs/stylex';

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
  inner: {
    height: '100%',
  },
});
