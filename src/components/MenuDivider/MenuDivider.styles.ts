import stylex from '@stylexjs/stylex';

export type IMenuDividerStylesKey = keyof typeof menuDividerStyles;
export const menuDividerStyles = stylex.create({
  host: {
    marginTop: 8,
    marginBottom: 8,
  },
});
