import stylex from '@stylexjs/stylex';

export type IColorInputFieldStylesKey = keyof typeof colorInputFieldStyles;
export const colorInputFieldStyles = stylex.create({
  host: {},
  colorTag: {
    marginRight: '0.5rem',
  },
});
