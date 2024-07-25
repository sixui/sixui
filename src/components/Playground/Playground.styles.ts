import stylex from '@stylexjs/stylex';

export type IPlaygroundStylesKey = keyof typeof playgroundStyles;
export const playgroundStyles = stylex.create({
  host: {},
});
