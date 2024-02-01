import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IItemStyleKey } from '@/components/atoms/Item';
import { componentVars as vars } from './Item.stylex';

// https://github.com/material-components/material-web/blob/main/labs/item/internal/_item.scss
type IItemStyles = IStyles<IItemStyleKey>;
export const styles: MapNamespaces<IItemStyles> = stylex.create<IItemStyles>({
  host: {
    color: vars.labelTextColor,
    fontFamily: vars.labelTextFont,
    fontSize: vars.labelTextSize,
    fontWeight: vars.labelTextWeight,
    lineHeight: vars.labelTextLineHeight,
    letterSpacing: vars.labelTextLetterSpacing,
    alignItems: 'center',
    display: 'flex',
    gap: '16px',
    minHeight: '56px',
    padding: '12px 16px',
    position: 'relative',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  host$multiline: {
    minHeight: '72px',
  },
  overline: {
    color: vars.overlineColor,
    fontFamily: vars.overlineFont,
    fontSize: vars.overlineSize,
    fontWeight: vars.overlineWeight,
    lineHeight: vars.overlineLineHeight,
    letterSpacing: vars.overlineLetterSpacing,
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
  },
  nonText: {},
  text: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  textSlot: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
