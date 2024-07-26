import stylex from '@stylexjs/stylex';

import { motionTokens } from '~/themes/base/motion.stylex';
import { snackbarTokens } from './Snackbar.stylex';

export type ISnackbarStylesKey = keyof typeof snackbarStyles;
export const snackbarStyles = stylex.create({
  host: {
    display: 'flex',
    position: 'fixed',
    bottom: snackbarTokens.fixedBottomSpace,
    zIndex: 499,
    minWidth: {
      default: 'unset',
      '@media (max-width: 600px)': `calc(100% - ${snackbarTokens.fixedHorizontalSpace$compact} * 2)`,
    },
  },
  host$left: {
    left: {
      default: snackbarTokens.fixedHorizontalSpace,
      '@media (max-width: 600px)': snackbarTokens.fixedHorizontalSpace$compact,
    },
    justifyContent: 'start',
  },
  host$center: {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)',
    justifyContent: 'center',
  },
  snackbarContent: {
    transformOrigin: 'bottom',
  },
  animation$enter: {
    opacity: 0,
    transform: 'scaleY(0.5)',
  },
  animation$enterActive: {
    opacity: 1,
    transform: 'scaleY(1)',
    transitionProperty: 'opacity, transform',
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
  animation$exitActive: {
    opacity: 0,
    transitionProperty: 'opacity, transform',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
});
