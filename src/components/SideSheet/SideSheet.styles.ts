import stylex from '@stylexjs/stylex';
import { motionTokens } from '~/themes/base/motion.stylex';

export type ISideSheetStylesKey = keyof typeof sideSheetStyles;
export const sideSheetStyles = stylex.create({
  host: {},
  animation$enter: {
    transform: 'translateX(-100%)',
  },
  // FIXME: take left/right anchor in consideration
  animation$enterActive: {
    transform: 'translateX(0)',
    transitionProperty: 'transform',
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
  animation$exitActive: {
    transform: 'translateX(-100%)',
    transitionProperty: 'transform',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
});
