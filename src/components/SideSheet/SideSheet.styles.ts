import stylex from '@stylexjs/stylex';
import { motionTokens } from '~/themes/base/motion.stylex';

export type ISideSheetStylesKey = keyof typeof sideSheetStyles;
export const sideSheetStyles = stylex.create({
  host: {},
  animation$entering: {
    transform: 'translateX(0)',
    transitionProperty: 'transform',
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
  animation$entered: {
    transform: 'translateX(0)',
  },
  animation$exiting: {
    transform: {
      default: 'unset',
      ':is([data-anchor="left"])': 'translateX(-100%)',
      ':is([data-anchor="right"])': 'translateX(100%)',
    },
    transitionProperty: 'transform',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
  animation$exited: {
    transform: {
      default: 'unset',
      ':is([data-anchor="left"])': 'translateX(-100%)',
      ':is([data-anchor="right"])': 'translateX(100%)',
    },
  },
  animation$unmounted: {},
});
