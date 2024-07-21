import stylex from '@stylexjs/stylex';

export type IPopoverBaseStylesKey = keyof typeof popoverBaseStyles;
export const popoverBaseStyles = stylex.create({
  host: {
    zIndex: 499,
  },
});
