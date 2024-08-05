import stylex from '@stylexjs/stylex';

import { labeledTokens } from './Labeled.stylex';

export type ILabeledStylesKey = keyof typeof labeledStyles;
export const labeledStyles = stylex.create({
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
    color: labeledTokens.labelTextColor,
    fontFamily: labeledTokens.labelTextFont,
    fontSize: labeledTokens.labelTextSize,
    fontWeight: labeledTokens.labelTextWeight,
    lineHeight: labeledTokens.labelTextLineHeight,
    letterSpacing: labeledTokens.labelTextLetterSpacing,
    cursor: 'pointer',
  },
  label$error: {
    color: labeledTokens.supportingTextColor$error,
  },
  label$disabled: {
    color: labeledTokens.labelTextColor$disabled,
    opacity: labeledTokens.labelTextOpacity$disabled,
    pointerEvents: 'none',
  },
  action: {
    flexGrow: 0,
    color: labeledTokens.actionTextColor,
    fontFamily: labeledTokens.actionTextFont,
    fontSize: labeledTokens.actionTextSize,
    fontWeight: labeledTokens.actionTextWeight,
    lineHeight: labeledTokens.actionTextLineHeight,
    letterSpacing: labeledTokens.actionTextLetterSpacing,
    display: 'flex',
    alignItems: 'center',
  },
  action$disabled: {
    color: labeledTokens.actionTextColor$disabled,
    opacity: labeledTokens.actionTextOpacity$disabled,
  },
  supportingText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
    color: labeledTokens.supportingTextColor,
    fontFamily: labeledTokens.supportingTextFont,
    fontSize: labeledTokens.supportingTextSize,
    fontWeight: labeledTokens.supportingTextWeight,
    lineHeight: labeledTokens.supportingTextLineHeight,
    letterSpacing: labeledTokens.supportingTextLetterSpacing,
  },
  supportingText$error: {
    color: labeledTokens.supportingTextColor$error,
  },
  supportingText$disabled: {
    color: labeledTokens.supportingTextColor$disabled,
    opacity: labeledTokens.supportingTextOpacity$disabled,
  },
});
