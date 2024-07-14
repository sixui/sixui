import stylex from '@stylexjs/stylex';

export type ICardActionsStyleKsey = keyof typeof cardActionsStyles;
export const cardActionsStyles = stylex.create({
  host: {
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
});
