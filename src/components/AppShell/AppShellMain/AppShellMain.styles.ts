import stylex from '@stylexjs/stylex';
import { motionTokens } from '~/themes/base/motion.stylex';
import { appShellTokens } from '../AppShell.stylex';

export type IAppShellMainStylesKey = keyof typeof appShellMainStyles;
export const appShellMainStyles = stylex.create({
  host: {
    flexGrow: 1,
    transitionProperty: 'margin',
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
  host$expanded: {
    marginLeft: `calc(-1 * ${appShellTokens.navigationDrawerWidth})`,
    transitionProperty: 'margin',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
});
