import stylex from '@stylexjs/stylex';

export type IAppLayoutStylesKey = keyof typeof appLayoutStyles;
export const appLayoutStyles = stylex.create({
  host: {},
});
