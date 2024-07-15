import stylex from '@stylexjs/stylex';

import { plainTooltipContentTokens } from './PlainTooltipContent.stylex';

export type IPlainTooltipContentStylesKey =
  keyof typeof plainTooltipContentStyles;
export const plainTooltipContentStyles = stylex.create({
  host: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: 'max-content',
    borderRadius: plainTooltipContentTokens.containerShape,
    backgroundColor: plainTooltipContentTokens.containerColor,
    paddingTop: plainTooltipContentTokens.topSpace,
    paddingBottom: plainTooltipContentTokens.bottomSpace,
    paddingLeft: plainTooltipContentTokens.leadingSpace,
    paddingRight: plainTooltipContentTokens.trailingSpace,
    maxWidth: plainTooltipContentTokens.containerMaxWidth,
    minHeight: plainTooltipContentTokens.containerMinHeight,
  },
  supportingText: {
    color: plainTooltipContentTokens.supportingTextColor,
    fontFamily: plainTooltipContentTokens.supportingTextFont,
    fontSize: plainTooltipContentTokens.supportingTextSize,
    fontWeight: plainTooltipContentTokens.supportingTextWeight,
    lineHeight: plainTooltipContentTokens.supportingTextLineHeight,
    letterSpacing: plainTooltipContentTokens.supportingTextLetterSpacing,
  },
  cursor: {
    fill: plainTooltipContentTokens.containerColor,
  },
});
