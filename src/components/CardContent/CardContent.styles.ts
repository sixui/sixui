import stylex from '@stylexjs/stylex';

import { cardContentTokens } from './CardContent.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

export type ICardContentStylesKey = keyof typeof cardContentStyles;
export const cardContentStyles = stylex.create({
  host: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingTokens.padding$4,
    color: cardContentTokens.textColor,

    paddingTop: cardContentTokens.topSpace,
    paddingBottom: cardContentTokens.bottomSpace,
    paddingLeft: cardContentTokens.leadingSpace,
    paddingRight: cardContentTokens.trailingSpace,
  },
  host$actionable: {
    paddingTop: cardContentTokens.topSpace$actionable,
    paddingBottom: cardContentTokens.bottomSpace$actionable,
    paddingLeft: cardContentTokens.leadingSpace$actionable,
    paddingRight: cardContentTokens.trailingSpace$actionable,
  },
});
