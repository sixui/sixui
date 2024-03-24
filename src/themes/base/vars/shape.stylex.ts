import stylex from '@stylexjs/stylex';

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-shape.scss

export const shapeVars = stylex.defineVars({
  corner$full: '999px',

  corner$xl: '28px',
  cornerTop$xl: '28px 28px 0px 0px',

  corner$lg: '16px',
  cornerStart$lg: '16px 0px 0px 16px',
  cornerEnd$lg: '0px 16px 16px 0px',
  cornerTop$lg: '16px 16px 0px 0px',

  corner$md: '12px',

  corner$sm: '8px',

  corner$xs: '6px',
  cornerTop$xs: '6px 6px 0px 0px',

  corner$none: '0',
});
