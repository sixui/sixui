import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IItemStyleKey } from '@/components/atoms/Item';
import { componentVars as vars } from './Item.stylex';

// https://github.com/material-components/material-web/blob/main/labs/item/internal/_item.scss
type IItemStyles = IStyles<IItemStyleKey>;
export const styles: MapNamespaces<IItemStyles> = stylex.create<IItemStyles>({
  host: {
    alignItems: 'center',
    display: 'flex',
    gap: 12,
    minHeight: 56,
    padding: '12px 16px',
    position: 'relative',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  nonText: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    color: vars.nonTextColor,
  },
  text: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'column',
    overflow: 'hidden',
    color: vars.textColor,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
  },
  host$multiline: {
    minHeight: 72,
  },
  start: {
    color: vars.startColor,
  },
  end: {
    color: vars.endColor,
  },
  overline: {
    color: vars.overlineColor,
    fontFamily: vars.overlineFont,
    fontSize: vars.overlineSize,
    fontWeight: vars.overlineWeight,
    lineHeight: vars.overlineLineHeight,
    letterSpacing: vars.overlineLetterSpacing,
  },
  headline: {
    color: vars.headlineColor,
    fontFamily: vars.headlineFont,
    fontSize: vars.headlineSize,
    fontWeight: vars.headlineWeight,
    lineHeight: vars.headlineLineHeight,
    letterSpacing: vars.headlineLetterSpacing,
  },
  supportingText: {
    color: vars.supportingTextColor,
    fontFamily: vars.supportingTextFont,
    fontSize: vars.supportingTextSize,
    fontWeight: vars.supportingTextWeight,
    lineHeight: vars.supportingTextLineHeight,
    letterSpacing: vars.supportingTextLetterSpacing,
  },
  trailingSupportingText: {
    color: vars.trailingSupportingTextColor,
    fontFamily: vars.trailingSupportingTextFont,
    fontSize: vars.trailingSupportingTextSize,
    fontWeight: vars.trailingSupportingTextWeight,
    lineHeight: vars.trailingSupportingTextLineHeight,
    letterSpacing: vars.trailingSupportingTextLetterSpacing,
  },
  // A slot for background container elements, such as ripples and focus rings.
  container: {
    inset: 0,
    position: 'absolute',
  },
  children: {
    // Needed since the default slot can have just text content, and ellipsis
    // need an inline display.
    display: 'inline',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: vars.labelTextColor,
    fontFamily: vars.labelTextFont,
    fontSize: vars.labelTextSize,
    fontWeight: vars.labelTextWeight,
    lineHeight: vars.labelTextLineHeight,
    letterSpacing: vars.labelTextLetterSpacing,
  },
  textSlot: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
