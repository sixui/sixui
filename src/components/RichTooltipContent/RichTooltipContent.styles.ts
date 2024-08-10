import stylex from '@stylexjs/stylex';

import { elevationTokens } from '../Elevation/Elevation.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { richTooltipContentTokens } from './RichTooltipContent.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

export type IRichTooltipContentStylesKey =
  keyof typeof richTooltipContentStyles;
export const richTooltipContentStyles = stylex.create({
  host: {
    position: 'relative',
    width: 'max-content',
    borderRadius: richTooltipContentTokens.containerShape,
    backgroundColor: richTooltipContentTokens.containerColor,
    maxWidth: richTooltipContentTokens.containerMaxWidth,
    paddingLeft: richTooltipContentTokens.leadingSpace,
    paddingRight: richTooltipContentTokens.trailingSpace,
  },
  content: {
    paddingTop: richTooltipContentTokens.topSpace,
    paddingBottom: richTooltipContentTokens.bottomSpace,
  },
  subhead: {
    color: richTooltipContentTokens.subheadColor,
    fontFamily: richTooltipContentTokens.subheadFont,
    fontSize: richTooltipContentTokens.subheadSize,
    fontWeight: richTooltipContentTokens.subheadWeight,
    lineHeight: richTooltipContentTokens.subheadLineHeight,
    letterSpacing: richTooltipContentTokens.subheadLetterSpacing,
  },
  supportingText: {
    color: richTooltipContentTokens.supportingTextColor,
    fontFamily: richTooltipContentTokens.supportingTextFont,
    fontSize: richTooltipContentTokens.supportingTextSize,
    fontWeight: richTooltipContentTokens.supportingTextWeight,
    lineHeight: richTooltipContentTokens.supportingTextLineHeight,
    letterSpacing: richTooltipContentTokens.supportingTextLetterSpacing,
  },
  actions: {
    paddingBottom: richTooltipContentTokens.actionsBottomSpace,
    marginLeft: `calc(-1 * ${spacingTokens.padding$2})`,
  },
  cursor: {
    fill: colorSchemeTokens.primary,
  },
});

export const richTooltipContentElevationStyles = stylex.create({
  host: {
    [elevationTokens.boxShadow]: richTooltipContentTokens.containerElevation,
  },
});
