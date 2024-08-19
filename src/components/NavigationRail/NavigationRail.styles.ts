import stylex from '@stylexjs/stylex';

export type INavigationRailStylesKey = keyof typeof navigationRailStyles;
export const navigationRailStyles = stylex.create({
  host: {},
});
