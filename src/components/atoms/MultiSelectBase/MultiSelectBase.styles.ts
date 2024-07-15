import stylex from '@stylexjs/stylex';

export type IMultiSelectBaseStylesKey = keyof typeof multiSelectBaseStyles;
export const multiSelectBaseStyles = stylex.create({
  chip: {
    marginRight: '0.5rem',
  },
});

export const multiSelectBaseFieldStyles = stylex.create({
  contentSlot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: '0.5rem',
    flexWrap: 'wrap',
  },
});
