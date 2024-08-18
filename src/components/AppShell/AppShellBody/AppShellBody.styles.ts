import stylex from '@stylexjs/stylex';
import { motionTokens } from '~/themes/base/motion.stylex';
import { appShellTokens } from '../AppShell.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';

export type IAppShellBodyStylesKey = keyof typeof appShellBodyStyles;
export const appShellBodyStyles = stylex.create({
  host: {
    flexGrow: 1,
    marginLeft: `calc(-1 * min(${appShellTokens.navigationDrawerWidth}, ${appShellTokens.navigationDrawerMaxWidth}))`,
    marginRight: `calc(-1 * min(${appShellTokens.asideWidth}, ${appShellTokens.asideMaxWidth}))`,
    transitionProperty: 'margin',
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
    backgroundColor: colorSchemeTokens.surface,

    paddingLeft: {
      default: appShellTokens.windowHorizontalSpace$compact,
      '@container compact (min-width: 0)':
        appShellTokens.windowHorizontalSpace$compact,
      '@container medium (min-width: 0)':
        appShellTokens.windowHorizontalSpace$medium,
      '@container expanded (min-width: 0)':
        appShellTokens.windowHorizontalSpace$expanded,
      '@container large (min-width: 0)':
        appShellTokens.windowHorizontalSpace$large,
      '@container extraLarge (min-width: 0)':
        appShellTokens.windowHorizontalSpace$extraLarge,
    },
    paddingRight: {
      default: appShellTokens.windowHorizontalSpace$compact,
      '@container compact (min-width: 0)':
        appShellTokens.windowHorizontalSpace$compact,
      '@container medium (min-width: 0)':
        appShellTokens.windowHorizontalSpace$medium,
      '@container expanded (min-width: 0)':
        appShellTokens.windowHorizontalSpace$expanded,
      '@container large (min-width: 0)':
        appShellTokens.windowHorizontalSpace$large,
      '@container extraLarge (min-width: 0)':
        appShellTokens.windowHorizontalSpace$extraLarge,
    },
  },
  host$standardNavigationDrawerOpened: {
    marginLeft: 0,
    transitionProperty: 'margin',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
  host$standardAsideOpened: {
    marginRight: 0,
    transitionProperty: 'margin',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
});
