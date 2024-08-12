import stylex from '@stylexjs/stylex';

import { motionTokens } from '~/themes/base/motion.stylex';

export type IFloatingTransitionStylesKey =
  keyof typeof floatingTransitionStyles;
export const floatingTransitionStyles = stylex.create({
  transition$unmounted: {},
  transition$unmounted$horizontal: {},
  transition$unmounted$vertical: {},
  transition$initial: {
    opacity: 0.75,
    transform: {
      default: 'unset',
      ':is([data-pattern^="enterExit"])': 'scale(0.5)',
      ':is([data-pattern^="enterExitOffScreen"])': 'translate(-30%, -30%)',
    },
  },
  transition$initial$horizontal: {
    transform: {
      default: 'unset',
      ':is([data-pattern^="enterExit"])': 'scaleX(0.5)',
      ':is([data-pattern^="enterExitOffScreen-left"])': 'translateX(-30%)',
      ':is([data-pattern^="enterExitOffScreen-right"])': 'translateX(130%)',
    },
  },
  transition$initial$vertical: {
    transform: {
      default: 'unset',
      ':is([data-pattern^="enterExit"])': 'scaleY(0.75)',
      ':is([data-pattern^="enterExitOffScreen-top"])': 'translateY(130%)',
      ':is([data-pattern^="enterExitOffScreen-bottom"])': 'translateY(-30%)',
    },
  },
  transition$open: {
    opacity: 1,
    transform: {
      default: 'unset',
      ':is([data-pattern^="enterExit"])': 'scale(1)',
      ':is([data-pattern^="enterExitOffScreen"])': 'translate(0)',
    },
    transitionProperty: {
      default: 'opacity',
      ':is([data-pattern^="enterExit"])': 'opacity, transform',
    },
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
  transition$open$horizontal: {
    transform: {
      default: 'unset',
      ':is([data-pattern^="enterExit"])': 'scaleX(1)',
      ':is([data-pattern^="enterExitOffScreen"])': 'translateX(0)',
    },
  },
  transition$open$vertical: {
    transform: {
      default: 'unset',
      ':is([data-pattern^="enterExit"])': 'scaleY(1)',
      ':is([data-pattern^="enterExitOffScreen"])': 'translateY(0)',
    },
  },
  transition$close: {
    opacity: 0.75,
    transform: {
      default: 'unset',
      ':is([data-pattern^="enterExit"])': 'scale(0.5)',
      ':is([data-pattern^="enterExitOffScreen"])': 'translate(-30% -30%)',
    },
    transitionProperty: {
      default: 'opacity',
      ':is([data-pattern^="enterExit"])': 'opacity, transform',
    },
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
  transition$close$horizontal: {
    transform: {
      default: 'unset',
      ':is([data-pattern^="enterExit"])': 'scaleX(0.5)',
      ':is([data-pattern^="enterExitOffScreen-left"])': 'translateX(-30%)',
      ':is([data-pattern^="enterExitOffScreen-right"])': 'translateX(130%)',
    },
  },
  transition$close$vertical: {
    transform: {
      default: 'unset',
      ':is([data-pattern^="enterExit"])': 'scaleY(0.75)',
      ':is([data-pattern^="enterExitOffScreen-top"])': 'translateY(30%)',
      ':is([data-pattern^="enterExitOffScreen-bottom"])': 'translateY(-130%)',
    },
  },
});
