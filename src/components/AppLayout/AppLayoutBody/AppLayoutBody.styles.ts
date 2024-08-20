import stylex from '@stylexjs/stylex';

import { motionTokens } from '~/themes/base/motion.stylex';
import { appLayoutTokens } from '../AppLayout.stylex';

export type IAppLayoutBodyStylesKey = keyof typeof appLayoutBodyStyles;
export const appLayoutBodyStyles = stylex.create({
  host: {
    flexGrow: 1,
    transitionProperty: 'margin',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
    minHeight: '100vh',
  },
  host$hasHeader: {
    minHeight: `calc(100vh - ${appLayoutTokens.headerHeight})`,
  },
  host$standardNavigationDrawerOpened: {
    // marginLeft: appLayoutTokens.standardNavigationDrawerWidth,
  },
  host$navigationRailOpened: {
    // marginLeft: appLayoutTokens.navigationRailWidth,
  },
  // host$hasHeader$opened: {},
  // host$hasNavigationDrawer: {
  //   marginLeft: `calc(-1 * ${appLayoutTokens.navigationDrawerWidth})`,
  // },
  // host$hasNavigationDrawer$opened: {
  //   marginLeft: 0,
  //   transitionDuration: motionTokens.duration$long3,
  //   transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  // },
  // host$hasAside: {
  //   marginRight: `calc(-1 * ${appLayoutTokens.asideWidth})`,
  // },
  // host$followAside$opened: {
  //   marginRight: 0,
  //   transitionDuration: motionTokens.duration$long3,
  //   transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  // },
  // host$hasNavigationRail: {
  //   // marginLeft: `calc(-1 * ${appLayoutTokens.navigationDrawerWidth} +
  //   // ${appLayoutTokens.navigationRailWidth})`,
  //   marginLeft: `calc(-1 * ${appLayoutTokens.navigationRailWidth})`,
  // },
  // host$hasNavigationRail$opened: {
  //   // marginLeft: `calc(-1 * ${appLayoutTokens.navigationDrawerWidth} +
  //   // ${appLayoutTokens.navigationRailWidth})`,
  //   marginLeft: 0,
  // },
});
