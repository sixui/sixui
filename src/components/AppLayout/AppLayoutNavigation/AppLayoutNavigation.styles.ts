import stylex from '@stylexjs/stylex';
import { appLayoutTokens } from '../AppLayout.stylex';
import { motionTokens } from '~/themes/base/motion.stylex';
import { zIndexTokens } from '~/themes/base/zIndex.stylex';

export type IAppLayoutNavigationStylesKey =
  keyof typeof appLayoutNavigationStyles;
export const appLayoutNavigationStyles = stylex.create({
  host: {
    position: 'sticky',
    left: 0,
    top: 0,
    height: '100vh',
    width: 0,
    zIndex: `calc(${zIndexTokens.app} + 1)`,

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
  host$headerOpened: {
    height: `calc(100vh - ${appLayoutTokens.headerHeight})`,
    top: appLayoutTokens.headerHeight,
  },
  host$fullHeight: {
    height: '100vh',
    top: 0,
  },
  inner: {
    position: 'absolute',
    insetBlock: 0,
    insetInlineStart: 0,
  },
});
