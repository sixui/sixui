import stylex from '@stylexjs/stylex';

import { cardTitleTokens as vars } from './CardTitle.stylex';

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
    color: vars.headlineColor,
    fontFamily: vars.headlineFont,
    fontSize: vars.headlineSize,
    fontWeight: vars.headlineWeight,
    lineHeight: vars.headlineLineHeight,
    letterSpacing: vars.headlineLetterSpacing,
  },
  subhead: {
    color: vars.subheadColor,
    fontFamily: vars.subheadFont,
    fontSize: vars.subheadSize,
    fontWeight: vars.subheadWeight,
    lineHeight: vars.subheadLineHeight,
    letterSpacing: vars.subheadLetterSpacing,
  },
  supportingText: {
    color: vars.supportingTextColor,
    fontFamily: vars.supportingTextTextFont,
    fontSize: vars.supportingTextTextSize,
    fontWeight: vars.supportingTextTextWeight,
    lineHeight: vars.supportingTextTextLineHeight,
    letterSpacing: vars.supportingTextTextLetterSpacing,
  },
});
