import stylex from '@stylexjs/stylex';

import { colorTagTokens } from './ColorTag.stylex';

export type IColorTagStylesKey = keyof typeof colorTagStyles;
export const colorTagStyles = stylex.create({
  host: {
    position: 'relative',
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
  emptyCrosshairs: {
    overflow: 'hidden',
    borderRadius: 'inherit',
    position: 'absolute',
    inset: 0,
    '::before': {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: colorTagTokens.emptyCrosshairsColor,
      width: '150%',
      transformOrigin: 'top left',
      transform: 'rotate(45deg)',
    },
    '::after': {
      content: '',
      position: 'absolute',
      bottom: 0,
      left: 0,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: colorTagTokens.emptyCrosshairsColor,
      width: '150%',
      transformOrigin: 'top left',
      transform: 'rotate(-45deg)',
    },
  },
  host$empty: {
    backgroundColor: colorTagTokens.containerColor$empty,
    borderWidth: colorTagTokens.containerOutlineWidth$empty,
    borderColor: colorTagTokens.containerOutlineColor$empty,
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
