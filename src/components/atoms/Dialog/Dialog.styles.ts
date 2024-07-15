import stylex from '@stylexjs/stylex';

import { motionTokens } from '@/themes/base/tokens/motion.stylex';

// https://github.com/material-components/material-web/blob/main/dialog/internal/_dialog.scss

export type IDialogStylesKey = keyof typeof dialogStyles;
export const dialogStyles = stylex.create({
  transition$unmounted: {},
  transition$initial: {
    opacity: 0,
    transform: 'translateY(-50%)',
  },
  transition$open: {
    opacity: 1,
    transform: 'translateY(0.5)',
    transformOrigin: 'top',
    transitionProperty: 'transform',
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
  transition$close: {
    opacity: 0,
    transform: 'translateY(-50%)',
    transformOrigin: 'top',
    transitionProperty: 'opacity, transform',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
});
