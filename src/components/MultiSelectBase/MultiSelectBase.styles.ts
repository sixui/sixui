import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';

export type IMultiSelectBaseStylesKey = keyof typeof multiSelectBaseStyles;
export const multiSelectBaseStyles = stylex.create({
  chip: {
    marginRight: spacingTokens.padding$2,
  },
});

export const multiSelectBaseFieldBaseStyles = stylex.create({
  contentSlot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: spacingTokens.padding$2,
    flexWrap: 'wrap',
  },
});
