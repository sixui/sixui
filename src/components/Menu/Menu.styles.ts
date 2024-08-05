import stylex from '@stylexjs/stylex';

export type IMenuStylesKey = keyof typeof menuStyles;
export const menuStyles = stylex.create({
  host: {
    zIndex: 499,
  },
  inner: {
    display: 'flex',
    flexGrow: 1,
  },
});
