import stylex from '@stylexjs/stylex';

import { densityTokens } from '~/themes/base/density.stylex';

export type ITouchTargetStylesKey = keyof typeof touchTargetStyles;
export const touchTargetStyles = stylex.create({
  host: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: densityTokens.minTargetSize,
    height: densityTokens.minTargetSize,
    transform: 'translate(-50%, -50%)',
  },
  host$hovered: {
    zIndex: 4,
  },
});
