import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IElementWithLabelStyleKey } from '@/components/molecules/ElementWithLabel';
import { componentVars as vars } from './ElementWithLabel.stylex';

type IElementWithLabelStyles = IStyles<IElementWithLabelStyleKey>;
export const styles: MapNamespaces<IElementWithLabelStyles> =
  stylex.create<IElementWithLabelStyles>({
    host: {
      display: 'grid',
      gridTemplateColumns: 'min-content auto',
      gridColumnGap: 16,
      alignItems: 'center',
    },
    element: {
      flexGrow: 0,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
    },
    labelText: {
      color: vars.labelTextColor,
      fontFamily: vars.labelTextFont,
      fontSize: vars.labelTextSize,
      fontWeight: vars.labelTextWeight,
      lineHeight: vars.labelTextLineHeight,
      letterSpacing: vars.labelTextLetterSpacing,
      display: 'flex',
      alignItems: 'center',
    },
    labelText$error: {
      color: vars.supportingTextColor$error,
    },
    labelText$disabled: {
      color: vars.labelTextColor$disabled,
      opacity: vars.labelTextOpacity$disabled,
    },
    supportingText: {
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
