import stylex from '@stylexjs/stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

const MIN_DENSITY = -1;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

export type ITextStylesKey = keyof typeof textStyles;
export const textStyles = stylex.create({
  host: {
    margin: 0,
  },
  host$gutterBottom: {
    marginBottom: spacingTokens.padding$1,
  },
  host$dimmed: {
    color: colorSchemeTokens.onSurfaceVariant,
  },
  host$truncted: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  display$lg: {
    fontFamily: typeScaleTokens.displayFont$lg,
    fontSize: typeScaleTokens.displaySize$lg,
    fontWeight: typeScaleTokens.displayWeight$lg,
    lineHeight: `calc(${typeScaleTokens.displayLineHeight$lg} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.displayLetterSpacing$lg,
  },
  display$md: {
    fontFamily: typeScaleTokens.displayFont$md,
    fontSize: typeScaleTokens.displaySize$md,
    fontWeight: typeScaleTokens.displayWeight$md,
    lineHeight: `calc(${typeScaleTokens.displayLineHeight$md} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.displayLetterSpacing$md,
  },
  display$sm: {
    fontFamily: typeScaleTokens.displayFont$sm,
    fontSize: typeScaleTokens.displaySize$sm,
    fontWeight: typeScaleTokens.displayWeight$sm,
    lineHeight: `calc(${typeScaleTokens.displayLineHeight$sm} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.displayLetterSpacing$sm,
  },
  headline$lg: {
    fontFamily: typeScaleTokens.headlineFont$lg,
    fontSize: typeScaleTokens.headlineSize$lg,
    fontWeight: typeScaleTokens.headlineWeight$lg,
    lineHeight: `calc(${typeScaleTokens.headlineLineHeight$lg} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.headlineLetterSpacing$lg,
  },
  headline$md: {
    fontFamily: typeScaleTokens.headlineFont$md,
    fontSize: typeScaleTokens.headlineSize$md,
    fontWeight: typeScaleTokens.headlineWeight$md,
    lineHeight: `calc(${typeScaleTokens.headlineLineHeight$md} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.headlineLetterSpacing$md,
  },
  headline$sm: {
    fontFamily: typeScaleTokens.headlineFont$sm,
    fontSize: typeScaleTokens.headlineSize$sm,
    fontWeight: typeScaleTokens.headlineWeight$sm,
    lineHeight: `calc(${typeScaleTokens.headlineLineHeight$sm} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.headlineLetterSpacing$sm,
  },
  title$lg: {
    fontFamily: typeScaleTokens.titleFont$lg,
    fontSize: typeScaleTokens.titleSize$lg,
    fontWeight: typeScaleTokens.titleWeight$lg,
    lineHeight: `calc(${typeScaleTokens.titleLineHeight$lg} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.titleLetterSpacing$lg,
  },
  title$md: {
    fontFamily: typeScaleTokens.titleFont$md,
    fontSize: typeScaleTokens.titleSize$md,
    fontWeight: typeScaleTokens.titleWeight$md,
    lineHeight: `calc(${typeScaleTokens.titleLineHeight$md} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.titleLetterSpacing$md,
  },
  title$sm: {
    fontFamily: typeScaleTokens.titleFont$sm,
    fontSize: typeScaleTokens.titleSize$sm,
    fontWeight: typeScaleTokens.titleWeight$sm,
    lineHeight: `calc(${typeScaleTokens.titleLineHeight$sm} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.titleLetterSpacing$sm,
  },
  body$lg: {
    fontFamily: typeScaleTokens.bodyFont$lg,
    fontSize: typeScaleTokens.bodySize$lg,
    fontWeight: typeScaleTokens.bodyWeight$lg,
    lineHeight: `calc(${typeScaleTokens.bodyLineHeight$lg} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.bodyLetterSpacing$lg,
  },
  body$md: {
    fontFamily: typeScaleTokens.bodyFont$md,
    fontSize: typeScaleTokens.bodySize$md,
    fontWeight: typeScaleTokens.bodyWeight$md,
    lineHeight: `calc(${typeScaleTokens.bodyLineHeight$md} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.bodyLetterSpacing$md,
  },
  body$sm: {
    fontFamily: typeScaleTokens.bodyFont$sm,
    fontSize: typeScaleTokens.bodySize$sm,
    fontWeight: typeScaleTokens.bodyWeight$sm,
    lineHeight: `calc(${typeScaleTokens.bodyLineHeight$sm} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.bodyLetterSpacing$sm,
  },
  label$lg: {
    fontFamily: typeScaleTokens.labelFont$lg,
    fontSize: typeScaleTokens.labelSize$lg,
    fontWeight: typeScaleTokens.labelWeight$lg,
    lineHeight: `calc(${typeScaleTokens.labelLineHeight$lg} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.labelLetterSpacing$lg,
  },
  label$md: {
    fontFamily: typeScaleTokens.labelFont$md,
    fontSize: typeScaleTokens.labelSize$md,
    fontWeight: typeScaleTokens.labelWeight$md,
    lineHeight: `calc(${typeScaleTokens.labelLineHeight$md} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.labelLetterSpacing$md,
  },
  label$sm: {
    fontFamily: typeScaleTokens.labelFont$sm,
    fontSize: typeScaleTokens.labelSize$sm,
    fontWeight: typeScaleTokens.labelWeight$sm,
    lineHeight: `calc(${typeScaleTokens.labelLineHeight$sm} + ${DENSITY})`,
    letterSpacing: typeScaleTokens.labelLetterSpacing$sm,
  },
});
