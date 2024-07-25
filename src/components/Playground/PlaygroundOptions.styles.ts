import stylex from '@stylexjs/stylex';

export type IPlaygroundOptionsStylesKey = keyof typeof playgroundOptionsStyles;
export const playgroundOptionsStyles = stylex.create({
  host: {},
});
