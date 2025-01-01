import stylex from '@stylexjs/stylex';

import { motionTokens } from '~/themes/base/motion.stylex';
import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { snackbarTokens } from './Snackbar.stylex';

export type ISnackbarStylesKey = keyof typeof snackbarStyles;
export const snackbarStyles = stylex.create({
  host: {
    display: 'flex',
    position: 'fixed',
    bottom: snackbarTokens.fixedBottomSpace,
    zIndex: zIndexTokens.overlay,
    minWidth: {
      default: 'unset',
      // '@container compact (min-width: 0)': `calc(100% - ${snackbarTokens.fixedHorizontalSpace$compact} * 2)`,
      // TODO: use better media queries
      '@media (min-width: 0) and (max-width: 599)': `calc(100% - ${snackbarTokens.fixedHorizontalSpace$compact} * 2)`,
    },
  },
  host$left: {
    left: {
      default: snackbarTokens.fixedHorizontalSpace,
      // '@container compact (min-width: 0)':
      //   snackbarTokens.fixedHorizontalSpace$compact,
      // TODO: use better media queries
      '@media (min-width: 0) and (max-width: 599)':
        snackbarTokens.fixedHorizontalSpace$compact,
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
