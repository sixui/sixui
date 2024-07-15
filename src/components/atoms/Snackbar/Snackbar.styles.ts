import stylex from '@stylexjs/stylex';

import { motionVars } from '@/themes/base/vars/motion.stylex';
import { snackbarTokens as vars } from './Snackbar.stylex';

export type ISnackbarStylesKey = keyof typeof snackbarStyles;
export const snackbarStyles = stylex.create({
  host: {
    display: 'flex',
    position: 'fixed',
    bottom: vars.fixedBottomSpace,
    zIndex: 499,
    minWidth: {
      default: 'unset',
      '@media (max-width: 600px)': `calc(100% - ${vars.fixedHorizontalSpace$compact} * 2)`,
    },
  },
  host$left: {
    left: {
      default: vars.fixedHorizontalSpace,
      '@media (max-width: 600px)': vars.fixedHorizontalSpace$compact,
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
    transitionDuration: motionVars.duration$long3,
    transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
  },
  animation$exitActive: {
    opacity: 0,
    transitionProperty: 'opacity, transform',
    transitionDuration: motionVars.duration$short3,
    transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
  },
});
