import stylex from '@stylexjs/stylex';

import { motionVars } from '@/themes/base/vars/motion.stylex';

export type ITooltipBaseStylesKey = keyof typeof tooltipBaseStyles;
export const tooltipBaseStyles = stylex.create({
  host: {
    zIndex: 499,
  },
  container: {
    transformOrigin: 'center',
  },
  transition$unmounted: {},
  transition$initial: {
    transform: 'scale(0)',
    opacity: 0,
  },
  transition$open: {
    transform: 'scale(1)',
    opacity: 1,
    transitionProperty: 'transform, opacity',
    transitionDuration: motionVars.duration$long1,
    transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
  },
  transition$close: {
    transform: 'scale(0)',
    opacity: 0,
    transitionProperty: 'transform, opacity',
    transitionDuration: motionVars.duration$short1,
    transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
  },
  transition$unmounted$nested: {},
  transition$initial$nested: {},
  transition$open$nested: {
    transition: 'none',
  },
  transition$close$nested: {
    transition: 'none',
  },
});
