import stylex from '@stylexjs/stylex';

import { motionTokens } from '~/themes/base/motion.stylex';

export type IFloatingTransitionStylesKey =
  keyof typeof floatingTransitionStyles;
export const floatingTransitionStyles = stylex.create({
  transition$enterExit$unmounted: {},
  transition$enterExit$unmounted$horizontal: {},
  transition$enterExit$unmounted$vertical: {},
  transition$enterExit$initial: {
    opacity: 0.75,
    transform: 'scale(0.5)',
  },
  transition$enterExit$initial$horizontal: {
    transform: 'scaleX(0.5)',
  },
  transition$enterExit$initial$vertical: {
    transform: 'scaleY(0.75)',
  },
  transition$enterExit$open: {
    transform: 'scale(1)',
    opacity: 1,
    transitionProperty: 'transform, opacity',
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
  transition$enterExit$open$horizontal: {
    transform: 'scaleX(1)',
  },
  transition$enterExit$open$vertical: {
    transform: 'scaleY(1)',
  },
  transition$enterExit$close: {
    transform: 'scale(0.5)',
    opacity: 0.75,
    transitionProperty: 'transform, opacity',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
  transition$enterExit$close$horizontal: {
    transform: 'scaleX(0.5)',
  },
  transition$enterExit$close$vertical: {
    transform: 'scaleY(0.75)',
  },
});
