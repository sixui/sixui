import stylex from '@stylexjs/stylex';

import { colorTagTokens } from './ColorTag.stylex';

export type IColorTagStylesKey = keyof typeof colorTagStyles;
export const colorTagStyles = stylex.create({
  host: {
    minWidth: colorTagTokens.containerMinWidth,
    height: colorTagTokens.containerHeight,
    borderRadius: colorTagTokens.containerShape,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderStyle: 'solid',
    backgroundColor: colorTagTokens.containerColor,
    borderWidth: colorTagTokens.containerOutlineWidth,
    borderColor: colorTagTokens.containerOutlineColor,
  },
  host$invalid: {
    backgroundColor: colorTagTokens.containerColor$invalid,
    borderWidth: colorTagTokens.containerOutlineWidth$invalid,
    borderColor: colorTagTokens.containerOutlineColor$invalid,
  },
  icon: {
    position: 'relative',
    color: colorTagTokens.iconColor,
    fontSize: colorTagTokens.iconSize,
    inlineSize: colorTagTokens.iconSize,
    blockSize: colorTagTokens.iconSize,
  },
  label: {
    position: 'relative',
    color: colorTagTokens.labelTextColor,
    fontFamily: colorTagTokens.labelTextFont,
    fontSize: colorTagTokens.labelTextSize,
    fontWeight: colorTagTokens.labelTextWeight,
    lineHeight: colorTagTokens.labelTextLineHeight,
    letterSpacing: colorTagTokens.labelTextLetterSpacing,
  },
});
