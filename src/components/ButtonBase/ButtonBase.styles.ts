import stylex from '@stylexjs/stylex';

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
