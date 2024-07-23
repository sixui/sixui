import stylex from '@stylexjs/stylex';

export type IExpandableStylesKey = keyof typeof expandableStyles;
export const expandableStyles = stylex.create({
  host: {
    overflow: 'hidden',
  },
  host$expanded: {
    overflow: 'visible',
  },
});
