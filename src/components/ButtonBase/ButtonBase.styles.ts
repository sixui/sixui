import stylex from '@stylexjs/stylex';
import { densityTokens } from '~/themes/base/density.stylex';

// https://github.com/material-components/material-web/blob/main/button/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/button/internal/_elevation.scss

export type IButtonBaseStylesKey = keyof typeof buttonBaseStyles;
export const buttonBaseStyles = stylex.create({
  host: {
    display: 'inline-flex',
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
  },
  host$disabled: {
    cursor: 'default',
    pointerEvents: 'none',
  },
  touchTarget: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `max(100%, ${densityTokens.minTargetSize})`,
    height: `max(100%, ${densityTokens.minTargetSize})`,
    transform: 'translate(-50%, -50%)',
  },
  background: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
  },
  background$disabled: {},
  outline: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
  },
  outline$disabled: {},
});
