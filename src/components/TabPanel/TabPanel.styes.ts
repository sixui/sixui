import stylex from '@stylexjs/stylex';

export type ITabPanelStylesKey = keyof typeof tabPanelStyles;
export const tabPanelStyles = stylex.create({
  host: {},
});
