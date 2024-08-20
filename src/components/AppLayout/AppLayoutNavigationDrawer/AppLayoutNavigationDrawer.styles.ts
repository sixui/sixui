import stylex from '@stylexjs/stylex';

import { drawerTokens } from '~/components/Drawer/Drawer.stylex';
import { appLayoutTokens } from '../AppLayout.stylex';

export type IAppLayoutNavigationDrawerStylesKey =
  keyof typeof appLayoutNavigationDrawerStyles;
export const appLayoutNavigationDrawerStyles = stylex.create({
  host: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: appLayoutTokens.standardNavigationDrawerWidth,
  },
  // host$standard$opened: {
  //   width: appLayoutTokens.navigationDrawerWidth,
  // },
  // // host$hasNavigationRail: {
  // //   marginLeft: `calc(-1 * ${appLayoutTokens.navigationRailWidth})`,
  // // },
  // host$hasNavigationRail$opened: {
  //   // width: appLayoutTokens.navigationRailWidth,
  // },
  // host$fullHeight: {
  //   height: `calc(100vh - 2 * ${drawerTokens.containerInset})`,
  //   top: 0,
  // },
  // inner: {
  //   width: `min(${appLayoutTokens.navigationDrawerWidth}, ${appLayoutTokens.navigationDrawerMaxWidth})`,
  //   height: '100%',
  // },
  inner: {
    height: '100%',
  },
  inner$modal: {
    width: appLayoutTokens.modalNavigationDrawerWidth,
  },
});
