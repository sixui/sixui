import stylex from '@stylexjs/stylex';
import { motionTokens } from '~/themes/base/motion.stylex';
import { appShellTokens } from '../AppLayout.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';

export type IAppLayoutBodyStylesKey = keyof typeof appShellBodyStyles;
export const appShellBodyStyles = stylex.create({
  host: {
    position: 'relative',
    flexGrow: 1,
    transitionProperty: 'margin',
    backgroundColor: colorSchemeTokens.surface,
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,

    // FIXME: delete
    // paddingLeft: {
    //   default: appShellTokens.windowHorizontalSpace$compact,
    //   '@container compact (min-width: 0)':
    //     appShellTokens.windowHorizontalSpace$compact,
    //   '@container medium (min-width: 0)':
    //     appShellTokens.windowHorizontalSpace$medium,
    //   '@container expanded (min-width: 0)':
    //     appShellTokens.windowHorizontalSpace$expanded,
    //   '@container large (min-width: 0)':
    //     appShellTokens.windowHorizontalSpace$large,
    //   '@container extraLarge (min-width: 0)':
    //     appShellTokens.windowHorizontalSpace$extraLarge,
    // },
    // paddingRight: {
    //   default: appShellTokens.windowHorizontalSpace$compact,
    //   '@container compact (min-width: 0)':
    //     appShellTokens.windowHorizontalSpace$compact,
    //   '@container medium (min-width: 0)':
    //     appShellTokens.windowHorizontalSpace$medium,
    //   '@container expanded (min-width: 0)':
    //     appShellTokens.windowHorizontalSpace$expanded,
    //   '@container large (min-width: 0)':
    //     appShellTokens.windowHorizontalSpace$large,
    //   '@container extraLarge (min-width: 0)':
    //     appShellTokens.windowHorizontalSpace$extraLarge,
    // },

    marginLeft: 0,
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
  host$followHeader: {},
  host$followHeader$opened: {
    // FIXME:
    // marginTop: appShellTokens.headerHeight,
  },
});
