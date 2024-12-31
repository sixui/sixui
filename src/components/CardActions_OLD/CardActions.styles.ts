import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';

export type ICardActionsStyleKsey = keyof typeof cardActionsStyles;
export const cardActionsStyles = stylex.create({
  host: {
    padding: spacingTokens.padding$4,
  },
});
