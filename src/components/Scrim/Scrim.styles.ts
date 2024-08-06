import stylex from '@stylexjs/stylex';

import { motionTokens } from '~/themes/base/motion.stylex';
import { scrimTokens } from './Scrim.stylex';
import { zIndexTokens } from '~/themes/base/zIndex.stylex';

export type IScrimStylesKey = keyof typeof scrimStyles;
export const scrimStyles = stylex.create({
  host: {
    zIndex: zIndexTokens.modal,
    display: 'grid',
    placeItems: 'center',
  },
  host$darken: {
    backgroundColor: scrimTokens.containerColor$darken,
  },
  host$lighten: {
    backgroundColor: scrimTokens.containerColor$lighten,
  },
  transition$unmounted: {},
  transition$initial: {
    opacity: 0,
  },
  transition$open: {
    opacity: 1,
    transitionProperty: 'opacity',
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
  transition$close: {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
});
