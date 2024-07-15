import stylex from '@stylexjs/stylex';

import { motionVars } from '@/themes/base/vars/motion.stylex';
import { scrimTokens } from './Scrim.stylex';

export type IScrimStylesKey = keyof typeof scrimStyles;
export const scrimStyles = stylex.create({
  host: {
    display: 'grid',
    placeItems: 'center',
    zIndex: 499,
  },
  host$darken: {
    backgroundColor: scrimTokens.containerColor$darken,
  },
  host$lighten: {
    backgroundColor: scrimTokens.containerColor$lighten,
  },
  transition$unmounted: {},
  transition$initial: {
    opacity: 0,
  },
  transition$open: {
    opacity: 1,
    transitionProperty: 'opacity',
    transitionDuration: motionVars.duration$long3,
    transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
  },
  transition$close: {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: motionVars.duration$short3,
    transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
  },
});
