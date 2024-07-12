import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IElementWithLabelStyleKey } from '@/components/molecules/ElementWithLabel';
import { componentVars as vars } from './ElementWithLabel.stylex';

type IElementWithLabelStyles = IStyles<IElementWithLabelStyleKey>;
export const styles: MapNamespaces<IElementWithLabelStyles> =
  stylex.create<IElementWithLabelStyles>({
    host$vertical: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    host$horizontal: {
      display: 'flex',
      gridColumnGap: '1rem',
      alignItems: 'center',
    },
    element: {
      flexGrow: 0,
      flexShrink: 0,
      flexDirection: 'inherit',
      display: 'flex',
      alignItems: 'normal',
      gap: '0.5rem',
    },
    header: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      gap: '0.125rem',
    },
    labelContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.25rem',
    },
    label: {
      color: vars.labelTextColor,
      fontFamily: vars.labelTextFont,
      fontSize: vars.labelTextSize,
      fontWeight: vars.labelTextWeight,
      lineHeight: vars.labelTextLineHeight,
      letterSpacing: vars.labelTextLetterSpacing,
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      cursor: 'pointer',
    },
    label$error: {
      color: vars.supportingTextColor$error,
    },
    label$disabled: {
      color: vars.labelTextColor$disabled,
      opacity: vars.labelTextOpacity$disabled,
    },
    action: {
      flexGrow: 0,
      color: vars.actionTextColor,
      fontFamily: vars.actionTextFont,
      fontSize: vars.actionTextSize,
      fontWeight: vars.actionTextWeight,
      lineHeight: vars.actionTextLineHeight,
      letterSpacing: vars.actionTextLetterSpacing,
      display: 'flex',
      alignItems: 'center',
    },
    action$disabled: {
      color: vars.actionTextColor$disabled,
      opacity: vars.actionTextOpacity$disabled,
    },
    supportingText: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.125rem',
      color: vars.supportingTextColor,
      fontFamily: vars.supportingTextFont,
      fontSize: vars.supportingTextSize,
      fontWeight: vars.supportingTextWeight,
      lineHeight: vars.supportingTextLineHeight,
      letterSpacing: vars.supportingTextLetterSpacing,
    },
    supportingText$error: {
      color: vars.supportingTextColor$error,
    },
    supportingText$disabled: {
      color: vars.supportingTextColor$disabled,
      opacity: vars.supportingTextOpacity$disabled,
    },
  });
