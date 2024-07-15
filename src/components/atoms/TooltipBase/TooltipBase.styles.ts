import stylex from '@stylexjs/stylex';

import { motionTokens } from '@/themes/base/tokens/motion.stylex';

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
    transitionDuration: motionTokens.duration$long1,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
  transition$close: {
    transform: 'scale(0)',
    opacity: 0,
    transitionProperty: 'transform, opacity',
    transitionDuration: motionTokens.duration$short1,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
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
