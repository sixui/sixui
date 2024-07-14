import stylex from '@stylexjs/stylex';

import { motionVars } from '@/themes/base/vars/motion.stylex';

export type IFloatingFilterableListBaseStylesKey =
  keyof typeof floatingFilterableListBaseStyles;
export const floatingFilterableListBaseStyles = stylex.create({
  host: {
    zIndex: 499,
  },
  container: {
    display: 'flex',
    flexGrow: 1,
  },
  transition$unmounted: {},
  transition$initial: {
    transform: 'scaleY(0.5)',
  },
  transition$open: {
    transform: 'scaleY(1)',
    transitionProperty: 'transform',
    transitionDuration: motionVars.duration$long3,
    transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
  },
  transition$close: {
    transform: 'scaleY(0)',
    transitionProperty: 'transform',
    transitionDuration: motionVars.duration$short3,
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
