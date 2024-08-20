import stylex from '@stylexjs/stylex';
import { appLayoutTokens } from '../AppLayout.stylex';
import { motionTokens } from '~/themes/base/motion.stylex';

export type IAppLayoutNavigationStylesKey =
  keyof typeof appLayoutNavigationStyles;
export const appLayoutNavigationStyles = stylex.create({
  host: {
    position: 'sticky',
    left: 0,
    top: appLayoutTokens.headerHeight,
    height: `calc(100vh - ${appLayoutTokens.headerHeight})`,
    width: 0,

    transitionProperty: 'width',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
  host$navigationRailOpened: {
    width: appLayoutTokens.navigationRailWidth,
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
  host$standardNavigationDrawerOpened: {
    width: appLayoutTokens.standardNavigationDrawerWidth,
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
  inner: {
    position: 'absolute',
    insetBlock: 0,
    insetInlineStart: 0,
  },
});
