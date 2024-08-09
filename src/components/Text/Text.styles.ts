import stylex from '@stylexjs/stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

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
    lineHeight: typeScaleTokens.displayLineHeight$lg,
    letterSpacing: typeScaleTokens.displayLetterSpacing$lg,
  },
  display$md: {
    fontFamily: typeScaleTokens.displayFont$md,
    fontSize: typeScaleTokens.displaySize$md,
    fontWeight: typeScaleTokens.displayWeight$md,
    lineHeight: typeScaleTokens.displayLineHeight$md,
    letterSpacing: typeScaleTokens.displayLetterSpacing$md,
  },
  display$sm: {
    fontFamily: typeScaleTokens.displayFont$sm,
    fontSize: typeScaleTokens.displaySize$sm,
    fontWeight: typeScaleTokens.displayWeight$sm,
    lineHeight: typeScaleTokens.displayLineHeight$sm,
    letterSpacing: typeScaleTokens.displayLetterSpacing$sm,
  },
  headline$lg: {
    fontFamily: typeScaleTokens.headlineFont$lg,
    fontSize: typeScaleTokens.headlineSize$lg,
    fontWeight: typeScaleTokens.headlineWeight$lg,
    lineHeight: typeScaleTokens.headlineLineHeight$lg,
    letterSpacing: typeScaleTokens.headlineLetterSpacing$lg,
  },
  headline$md: {
    fontFamily: typeScaleTokens.headlineFont$md,
    fontSize: typeScaleTokens.headlineSize$md,
    fontWeight: typeScaleTokens.headlineWeight$md,
    lineHeight: typeScaleTokens.headlineLineHeight$md,
    letterSpacing: typeScaleTokens.headlineLetterSpacing$md,
  },
  headline$sm: {
    fontFamily: typeScaleTokens.headlineFont$sm,
    fontSize: typeScaleTokens.headlineSize$sm,
    fontWeight: typeScaleTokens.headlineWeight$sm,
    lineHeight: typeScaleTokens.headlineLineHeight$sm,
    letterSpacing: typeScaleTokens.headlineLetterSpacing$sm,
  },
  title$lg: {
    fontFamily: typeScaleTokens.titleFont$lg,
    fontSize: typeScaleTokens.titleSize$lg,
    fontWeight: typeScaleTokens.titleWeight$lg,
    lineHeight: typeScaleTokens.titleLineHeight$lg,
    letterSpacing: typeScaleTokens.titleLetterSpacing$lg,
  },
  title$md: {
    fontFamily: typeScaleTokens.titleFont$md,
    fontSize: typeScaleTokens.titleSize$md,
    fontWeight: typeScaleTokens.titleWeight$md,
    lineHeight: typeScaleTokens.titleLineHeight$md,
    letterSpacing: typeScaleTokens.titleLetterSpacing$md,
  },
  title$sm: {
    fontFamily: typeScaleTokens.titleFont$sm,
    fontSize: typeScaleTokens.titleSize$sm,
    fontWeight: typeScaleTokens.titleWeight$sm,
    lineHeight: typeScaleTokens.titleLineHeight$sm,
    letterSpacing: typeScaleTokens.titleLetterSpacing$sm,
  },
  body$lg: {
    fontFamily: typeScaleTokens.bodyFont$lg,
    fontSize: typeScaleTokens.bodySize$lg,
    fontWeight: typeScaleTokens.bodyWeight$lg,
    lineHeight: typeScaleTokens.bodyLineHeight$lg,
    letterSpacing: typeScaleTokens.bodyLetterSpacing$lg,
  },
  body$md: {
    fontFamily: typeScaleTokens.bodyFont$md,
    fontSize: typeScaleTokens.bodySize$md,
    fontWeight: typeScaleTokens.bodyWeight$md,
    lineHeight: typeScaleTokens.bodyLineHeight$md,
    letterSpacing: typeScaleTokens.bodyLetterSpacing$md,
  },
  body$sm: {
    fontFamily: typeScaleTokens.bodyFont$sm,
    fontSize: typeScaleTokens.bodySize$sm,
    fontWeight: typeScaleTokens.bodyWeight$sm,
    lineHeight: typeScaleTokens.bodyLineHeight$sm,
    letterSpacing: typeScaleTokens.bodyLetterSpacing$sm,
  },
  label$lg: {
    fontFamily: typeScaleTokens.labelFont$lg,
    fontSize: typeScaleTokens.labelSize$lg,
    fontWeight: typeScaleTokens.labelWeight$lg,
    lineHeight: typeScaleTokens.labelLineHeight$lg,
    letterSpacing: typeScaleTokens.labelLetterSpacing$lg,
  },
  label$md: {
    fontFamily: typeScaleTokens.labelFont$md,
    fontSize: typeScaleTokens.labelSize$md,
    fontWeight: typeScaleTokens.labelWeight$md,
    lineHeight: typeScaleTokens.labelLineHeight$md,
    letterSpacing: typeScaleTokens.labelLetterSpacing$md,
  },
  label$sm: {
    fontFamily: typeScaleTokens.labelFont$sm,
    fontSize: typeScaleTokens.labelSize$sm,
    fontWeight: typeScaleTokens.labelWeight$sm,
    lineHeight: typeScaleTokens.labelLineHeight$sm,
    letterSpacing: typeScaleTokens.labelLetterSpacing$sm,
  },
});
