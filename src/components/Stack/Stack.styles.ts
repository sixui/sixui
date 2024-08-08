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
  host$grow: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '1fr',
  },
  host$grow$preventGrowOverflow: {
    gridAutoColumns: 'minmax(100px, 1fr)',
  },
});
