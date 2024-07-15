import stylex from '@stylexjs/stylex';

import { componentShowcaseTokens } from './ComponentShowcase.stylex';

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
    gap: '3.5rem',
    alignSelf: 'stretch',
  },
  cols: {
    display: 'flex',
  },
  gap$md: {
    gap: '2rem',
  },
  gap$lg: {
    gap: '2.5rem',
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
    maxWidth: 120,
  },
  leftBorder: {
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: componentShowcaseTokens.groupBorderColor,
    paddingLeft: '2rem',
  },
  invisible: {
    visibility: 'hidden',
  },
  w100: {
    width: '100%',
  },
});
