import stylex from '@stylexjs/stylex';

import { itemTokens } from './Item.stylex';

// https://github.com/material-components/material-web/blob/main/labs/item/internal/_item.scss

export type IItemStylesKey = keyof typeof itemStyles;
export const itemStyles = stylex.create({
  host: {
    alignItems: 'stretch',
    display: 'flex',
    position: 'relative',
    gap: itemTokens.gap,
  },
  nonText: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'inherit',
    color: itemTokens.nonTextColor,
  },
  text: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    flexDirection: 'column',
    overflow: 'hidden',
    color: itemTokens.textColor,
  },
  nonText$start: {
    color: itemTokens.leadingContentColor,
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
    color: itemTokens.trailingContentColor,
    borderTopRightRadius: 'inherit',
    borderBottomRightRadius: 'inherit',
  },
  overline: {
    color: itemTokens.overlineColor,
    fontFamily: itemTokens.overlineFont,
    fontSize: itemTokens.overlineSize,
    fontWeight: itemTokens.overlineWeight,
    lineHeight: itemTokens.overlineLineHeight,
    letterSpacing: itemTokens.overlineLetterSpacing,
  },
  supportingText: {
    color: itemTokens.supportingTextColor,
    fontFamily: itemTokens.supportingTextFont,
    fontSize: itemTokens.supportingTextSize,
    fontWeight: itemTokens.supportingTextWeight,
    lineHeight: itemTokens.supportingTextLineHeight,
    letterSpacing: itemTokens.supportingTextLetterSpacing,
  },
  nonText$trailingSupportingText: {
    color: itemTokens.trailingSupportingTextColor,
    fontFamily: itemTokens.trailingSupportingTextFont,
    fontSize: itemTokens.trailingSupportingTextSize,
    fontWeight: itemTokens.trailingSupportingTextWeight,
    lineHeight: itemTokens.trailingSupportingTextLineHeight,
    letterSpacing: itemTokens.trailingSupportingTextLetterSpacing,
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
    color: itemTokens.headlineTextColor,
    fontFamily: itemTokens.headlineTextFont,
    fontSize: itemTokens.headlineTextSize,
    fontWeight: itemTokens.headlineTextWeight,
    lineHeight: itemTokens.headlineTextLineHeight,
    letterSpacing: itemTokens.headlineTextLetterSpacing,
  },
});
