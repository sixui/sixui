import stylex from '@stylexjs/stylex';

export type IAppShellStylesKey = keyof typeof appShellStyles;
export const appShellStyles = stylex.create({
  main: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'row',
  },
});
