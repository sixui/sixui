import stylex from '@stylexjs/stylex';

import { placeholderTokens as vars } from './Placeholder.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';

export type IPlaceholderStylesKey = keyof typeof placeholderStyles;
export const placeholderStyles = stylex.create({
  host: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vars.containerShape,
    backgroundColor: vars.containerColor,
    color: vars.labelTextColor,
    fontFamily: vars.labelTextFont,
    lineHeight: vars.labelTextLineHeight,
    fontWeight: vars.labelTextWeight,
    width: 64,
    height: 64,
  },
  host$rectangular: {
    borderRadius: shapeVars.corner$none,
  },
  host$circular: {
    borderRadius: shapeVars.corner$full,
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
      borderTopColor: vars.crosshairsColor,
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
      borderBottomColor: vars.crosshairsColor,
      width: '150%',
      transformOrigin: 'top left',
      transform: 'rotate(-45deg)',
    },
  },
  label: {
    padding: '0.5rem',
    fontFamily: vars.labelTextFont,
    fontSize: vars.labelTextSize,
    lineHeight: vars.labelTextLineHeight,
    letterSpacing: vars.labelTextLetterSpacing,
    fontWeight: vars.labelTextWeight,
    zIndex: 1,
  },
});
