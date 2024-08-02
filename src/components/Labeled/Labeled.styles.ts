import stylex from '@stylexjs/stylex';

import { elementWithLabelTokens } from './Labeled.stylex';

export type ILabeledStylesKey = keyof typeof elementWithLabelStyles;
export const elementWithLabelStyles = stylex.create({
  host$vertical: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  host$horizontal: {
    display: 'flex',
    gridColumnGap: 12,
    alignItems: 'center',
  },
  content: {
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'inherit',
    alignItems: 'normal',
    gap: 4,
  },
  element: {
    display: 'flex',
    flexDirection: 'inherit',
    gap: 12,
  },
  rows: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  labelAndActionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  label: {
    color: elementWithLabelTokens.labelTextColor,
    fontFamily: elementWithLabelTokens.labelTextFont,
    fontSize: elementWithLabelTokens.labelTextSize,
    fontWeight: elementWithLabelTokens.labelTextWeight,
    lineHeight: elementWithLabelTokens.labelTextLineHeight,
    letterSpacing: elementWithLabelTokens.labelTextLetterSpacing,
    cursor: 'pointer',
  },
  label$error: {
    color: elementWithLabelTokens.supportingTextColor$error,
  },
  label$disabled: {
    color: elementWithLabelTokens.labelTextColor$disabled,
    opacity: elementWithLabelTokens.labelTextOpacity$disabled,
    pointerEvents: 'none',
  },
  action: {
    flexGrow: 0,
    color: elementWithLabelTokens.actionTextColor,
    fontFamily: elementWithLabelTokens.actionTextFont,
    fontSize: elementWithLabelTokens.actionTextSize,
    fontWeight: elementWithLabelTokens.actionTextWeight,
    lineHeight: elementWithLabelTokens.actionTextLineHeight,
    letterSpacing: elementWithLabelTokens.actionTextLetterSpacing,
    display: 'flex',
    alignItems: 'center',
  },
  action$disabled: {
    color: elementWithLabelTokens.actionTextColor$disabled,
    opacity: elementWithLabelTokens.actionTextOpacity$disabled,
  },
  supportingText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
    color: elementWithLabelTokens.supportingTextColor,
    fontFamily: elementWithLabelTokens.supportingTextFont,
    fontSize: elementWithLabelTokens.supportingTextSize,
    fontWeight: elementWithLabelTokens.supportingTextWeight,
    lineHeight: elementWithLabelTokens.supportingTextLineHeight,
    letterSpacing: elementWithLabelTokens.supportingTextLetterSpacing,
  },
  supportingText$error: {
    color: elementWithLabelTokens.supportingTextColor$error,
  },
  supportingText$disabled: {
    color: elementWithLabelTokens.supportingTextColor$disabled,
    opacity: elementWithLabelTokens.supportingTextOpacity$disabled,
  },
});
