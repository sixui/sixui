import stylex from '@stylexjs/stylex';

import { placeholderTokens } from './Placeholder.stylex';
import { shapeTokens } from '@/themes/base/tokens/shape.stylex';

export type IPlaceholderStylesKey = keyof typeof placeholderStyles;
export const placeholderStyles = stylex.create({
  host: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: placeholderTokens.containerShape,
    backgroundColor: placeholderTokens.containerColor,
    color: placeholderTokens.labelTextColor,
    fontFamily: placeholderTokens.labelTextFont,
    lineHeight: placeholderTokens.labelTextLineHeight,
    fontWeight: placeholderTokens.labelTextWeight,
    width: 64,
    height: 64,
  },
  host$rectangular: {
    borderRadius: shapeTokens.corner$none,
  },
  host$circular: {
    borderRadius: shapeTokens.corner$full,
  },
  guides: {
    overflow: 'hidden',
    borderRadius: 'inherit',
    position: 'absolute',
    inset: 0,
    '::before': {
      content: '',
      position: 'absolute',
      top: 0,
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: placeholderTokens.crosshairsColor,
      width: '150%',
      transformOrigin: 'top left',
      transform: 'rotate(45deg)',
    },
    '::after': {
      content: '',
      position: 'absolute',
      bottom: 0,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: placeholderTokens.crosshairsColor,
      width: '150%',
      transformOrigin: 'top left',
      transform: 'rotate(-45deg)',
    },
  },
  label: {
    padding: '0.5rem',
    fontFamily: placeholderTokens.labelTextFont,
    fontSize: placeholderTokens.labelTextSize,
    lineHeight: placeholderTokens.labelTextLineHeight,
    letterSpacing: placeholderTokens.labelTextLetterSpacing,
    fontWeight: placeholderTokens.labelTextWeight,
    zIndex: 1,
  },
});
