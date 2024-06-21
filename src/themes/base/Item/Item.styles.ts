import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IItemStyleKey } from '@/components/atoms/Item';
import { componentVars as vars } from './Item.stylex';

// https://github.com/material-components/material-web/blob/main/labs/item/internal/_item.scss

type IItemStyles = IStyles<IItemStyleKey>;
export const styles: MapNamespaces<IItemStyles> = stylex.create<IItemStyles>({
  host: {
    alignItems: 'stretch',
    display: 'flex',
    position: 'relative',
    gap: vars.gap,
  },
  nonText: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'inherit',
    color: vars.nonTextColor,
  },
  text: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    flexDirection: 'column',
    overflow: 'hidden',
    color: vars.textColor,
  },
  nonText$start: {
    color: vars.leadingContentColor,
    borderTopLeftRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nonText$end: {
    color: vars.trailingContentColor,
    borderTopRightRadius: 'inherit',
    borderBottomRightRadius: 'inherit',
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
  nonText$trailingSupportingText: {
    color: vars.trailingSupportingTextColor,
    fontFamily: vars.trailingSupportingTextFont,
    fontSize: vars.trailingSupportingTextSize,
    fontWeight: vars.trailingSupportingTextWeight,
    lineHeight: vars.trailingSupportingTextLineHeight,
    letterSpacing: vars.trailingSupportingTextLetterSpacing,
  },
  // A slot for background container elements, such as state layer and focus rings.
  container: {
    inset: 0,
    position: 'absolute',
    borderRadius: 'inherit',
  },
  headline: {
    // Needed since the default slot can have just text content, and ellipsis
    // need an inline display.
    display: 'inline',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: vars.headlineTextColor,
    fontFamily: vars.headlineTextFont,
    fontSize: vars.headlineTextSize,
    fontWeight: vars.headlineTextWeight,
    lineHeight: vars.headlineTextLineHeight,
    letterSpacing: vars.headlineTextLetterSpacing,
  },
});
