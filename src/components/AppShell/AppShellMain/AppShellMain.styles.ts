import stylex from '@stylexjs/stylex';

export type IAppShellMainStylesKey = keyof typeof appShellMainStyles;
export const appShellMainStyles = stylex.create({
  host: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'row',
  },
});
