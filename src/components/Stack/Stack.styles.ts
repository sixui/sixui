import stylex from '@stylexjs/stylex';

export type IStackStylesKey = keyof typeof StackStyles;
export const StackStyles = stylex.create({
  host: {
    display: 'flex',
  },
  host$vertical: {
    flexDirection: 'column',
  },
  host$horizontal: {
    flexDirection: 'row',
  },
});
