import stylex from '@stylexjs/stylex';

export type IFloatingFilterableListBaseStylesKey =
  keyof typeof floatingFilterableListBaseStyles;
export const floatingFilterableListBaseStyles = stylex.create({
  host: {
    zIndex: 499,
  },
  container: {
    display: 'flex',
    flexGrow: 1,
  },
});
