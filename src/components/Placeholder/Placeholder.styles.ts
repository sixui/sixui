import stylex from '@stylexjs/stylex';

import { stateTokens } from '~/themes/base/state.stylex';
import { placeholderTokens } from './Placeholder.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

export type IPlaceholderStylesKey = keyof typeof placeholderStyles;
export const placeholderStyles = stylex.create({
  host: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  host$disabled: {
    opacity: stateTokens.opacity$disabled,
  },
  crosshairs: {
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
    padding: spacingTokens.padding$2,
    fontFamily: placeholderTokens.labelTextFont,
    fontSize: placeholderTokens.labelTextSize,
    lineHeight: placeholderTokens.labelTextLineHeight,
    letterSpacing: placeholderTokens.labelTextLetterSpacing,
    fontWeight: placeholderTokens.labelTextWeight,
    zIndex: 1,
  },
});
