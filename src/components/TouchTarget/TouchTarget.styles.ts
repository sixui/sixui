import stylex from '@stylexjs/stylex';

import { densityTokens } from '~/themes/base/density.stylex';

export type ITouchTargetStylesKey = keyof typeof touchTargetStyles;
export const touchTargetStyles = stylex.create({
  host: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `max(100%, ${densityTokens.minTargetSize})`,
    height: `max(100%, ${densityTokens.minTargetSize})`,
    transform: 'translate(-50%, -50%)',
  },
});
