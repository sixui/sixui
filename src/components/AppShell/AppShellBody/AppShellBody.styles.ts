import stylex from '@stylexjs/stylex';
import { motionTokens } from '~/themes/base/motion.stylex';
import { appShellTokens } from '../AppShell.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';

export type IAppShellBodyStylesKey = keyof typeof appShellBodyStyles;
export const appShellBodyStyles = stylex.create({
  host: {
    marginLeft: 0,
    transitionProperty: 'margin',
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,

    paddingLeft: 24,
  },
  host$expanded: {
    marginLeft: {
      default: `calc(-1 * min(${appShellTokens.navigationDrawerWidth$expanded} * ${scaleTokens.scale}, 100vw))`,
      '@container expanded (min-width: 0)': `calc(-1 * ${appShellTokens.navigationDrawerWidth$expanded})`,
      '@container largeAndUp (min-width: 0)': `calc(-1 * ${appShellTokens.navigationDrawerWidth$largeAndUp})`,
    },
    transitionProperty: 'margin',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
});
