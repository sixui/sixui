import stylex from '@stylexjs/stylex';

import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { richTooltipContentTokens } from './RichTooltipContent.stylex';

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
    display: 'flex',
    flexDirection: 'column',
    gap: richTooltipContentTokens.gap,
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
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    paddingBottom: richTooltipContentTokens.actionsBottomSpace,
    flexWrap: 'wrap',
    marginLeft: -8,
  },
  cursor: {
    fill: colorRolesTokens.primary,
  },
});

export const richTooltipContentElevationStyles = stylex.create({
  host: {
    [elevationTokens.boxShadow]: richTooltipContentTokens.containerElevation,
  },
});
