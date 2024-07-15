import stylex from '@stylexjs/stylex';

import { cardTitleTokens } from './CardTitle.stylex';

export type ICardTitleStylesKey = keyof typeof cardTitleStyles;
export const cardTitleStyles = stylex.create({
  host: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
  },
  headline: {
    color: cardTitleTokens.headlineColor,
    fontFamily: cardTitleTokens.headlineFont,
    fontSize: cardTitleTokens.headlineSize,
    fontWeight: cardTitleTokens.headlineWeight,
    lineHeight: cardTitleTokens.headlineLineHeight,
    letterSpacing: cardTitleTokens.headlineLetterSpacing,
  },
  subhead: {
    color: cardTitleTokens.subheadColor,
    fontFamily: cardTitleTokens.subheadFont,
    fontSize: cardTitleTokens.subheadSize,
    fontWeight: cardTitleTokens.subheadWeight,
    lineHeight: cardTitleTokens.subheadLineHeight,
    letterSpacing: cardTitleTokens.subheadLetterSpacing,
  },
  supportingText: {
    color: cardTitleTokens.supportingTextColor,
    fontFamily: cardTitleTokens.supportingTextTextFont,
    fontSize: cardTitleTokens.supportingTextTextSize,
    fontWeight: cardTitleTokens.supportingTextTextWeight,
    lineHeight: cardTitleTokens.supportingTextTextLineHeight,
    letterSpacing: cardTitleTokens.supportingTextTextLetterSpacing,
  },
});
