import stylex from '@stylexjs/stylex';

import { componentShowcaseTokens } from './ComponentShowcase.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';

export type IComponentShowcaseStylesKey = keyof typeof componentShowcaseStyles;
export const componentShowcaseStyles = stylex.create({
  host: {},
  flex: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '100%',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  align$start: {
    alignItems: 'start',
  },
  align$center: {
    alignItems: 'center',
  },
  align$end: {
    alignItems: 'end',
  },
  align$stretch: {
    alignItems: 'stretch',
  },
  textRight: {
    textAlign: 'right',
  },
  groupRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingTokens.margin$8,
    alignSelf: 'stretch',
  },
  cols: {
    display: 'flex',
  },
  gap$md: {
    gap: spacingTokens.margin$4,
  },
  gap$lg: {
    gap: spacingTokens.margin$5,
  },
  rows: {
    display: 'flex',
    flexDirection: 'column',
  },
  legend: {
    fontFamily: componentShowcaseTokens.legendTextFont,
    fontSize: componentShowcaseTokens.legendTextSize,
    fontWeight: componentShowcaseTokens.legendTextWeight,
    lineHeight: componentShowcaseTokens.legendTextLineHeight,
    letterSpacing: componentShowcaseTokens.legendTextLetterSpacing,
    color: componentShowcaseTokens.legendTextColor,
  },
  legendRow: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: `calc(120px * ${scaleTokens.scale})`,
  },
  leftBorder: {
    borderLeftWidth: outlineTokens.width$xs,
    borderLeftStyle: 'solid',
    borderLeftColor: componentShowcaseTokens.groupBorderColor,
    paddingLeft: spacingTokens.margin$4,
  },
  invisible: {
    visibility: 'hidden',
  },
  w100: {
    width: '100%',
  },
});
