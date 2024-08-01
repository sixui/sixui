import stylex from '@stylexjs/stylex';

export const dialogStyles = stylex.create({
  dialogContent: {
    maxWidth: 'min(560px, calc(100% - 48px))',
    minWidth: 280,
    maxHeight: 'min(460px, calc(100% - 48px))',
  },
});
