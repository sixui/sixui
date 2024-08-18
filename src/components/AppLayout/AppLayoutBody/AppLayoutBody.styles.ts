import stylex from '@stylexjs/stylex';
import { motionTokens } from '~/themes/base/motion.stylex';
import { appShellTokens } from '../AppLayout.stylex';

export type IAppLayoutBodyStylesKey = keyof typeof appShellBodyStyles;
export const appShellBodyStyles = stylex.create({
  host: {
    flexGrow: 1,
    transitionProperty: 'margin',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
  host$followNavigationDrawer: {
    marginLeft: `calc(-1 * min(${appShellTokens.navigationDrawerWidth}, ${appShellTokens.navigationDrawerMaxWidth}))`,
  },
  host$followNavigationDrawer$opened: {
    marginLeft: 0,
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
  host$followAside: {
    marginRight: `calc(-1 * min(${appShellTokens.asideWidth}, ${appShellTokens.asideMaxWidth}))`,
  },
  host$followAside$opened: {
    marginRight: 0,
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
});
