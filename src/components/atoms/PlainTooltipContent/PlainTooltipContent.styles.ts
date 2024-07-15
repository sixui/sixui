import stylex from '@stylexjs/stylex';

import { plainTooltipContentTokens as vars } from './PlainTooltipContent.stylex';

export type IPlainTooltipContentStylesKey =
  keyof typeof plainTooltipContentStyles;
export const plainTooltipContentStyles = stylex.create({
  host: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: 'max-content',
    borderRadius: vars.containerShape,
    backgroundColor: vars.containerColor,
    paddingTop: vars.topSpace,
    paddingBottom: vars.bottomSpace,
    paddingLeft: vars.leadingSpace,
    paddingRight: vars.trailingSpace,
    maxWidth: vars.containerMaxWidth,
    minHeight: vars.containerMinHeight,
  },
  supportingText: {
    color: vars.supportingTextColor,
    fontFamily: vars.supportingTextFont,
    fontSize: vars.supportingTextSize,
    fontWeight: vars.supportingTextWeight,
    lineHeight: vars.supportingTextLineHeight,
    letterSpacing: vars.supportingTextLetterSpacing,
  },
  cursor: {
    fill: vars.containerColor,
  },
});
