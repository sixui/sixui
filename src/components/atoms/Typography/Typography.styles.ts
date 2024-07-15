import stylex from '@stylexjs/stylex';

import { typescaleTokens } from '@/themes/base/tokens/typo.stylex';

export type ITypographyStylesKey = keyof typeof typographyStyles;
export const typographyStyles = stylex.create({
  host: {
    margin: 0,
  },
  host$gutterBottom: {
    marginBottom: '0.35em',
  },
  display$lg: {
    fontFamily: typescaleTokens.displayFont$lg,
    fontSize: typescaleTokens.displaySize$lg,
    fontWeight: typescaleTokens.displayWeight$lg,
    lineHeight: typescaleTokens.displayLineHeight$lg,
    letterSpacing: typescaleTokens.displayLetterSpacing$lg,
  },
  display$md: {
    fontFamily: typescaleTokens.displayFont$md,
    fontSize: typescaleTokens.displaySize$md,
    fontWeight: typescaleTokens.displayWeight$md,
    lineHeight: typescaleTokens.displayLineHeight$md,
    letterSpacing: typescaleTokens.displayLetterSpacing$md,
  },
  display$sm: {
    fontFamily: typescaleTokens.displayFont$sm,
    fontSize: typescaleTokens.displaySize$sm,
    fontWeight: typescaleTokens.displayWeight$sm,
    lineHeight: typescaleTokens.displayLineHeight$sm,
    letterSpacing: typescaleTokens.displayLetterSpacing$sm,
  },
  headline$lg: {
    fontFamily: typescaleTokens.headlineFont$lg,
    fontSize: typescaleTokens.headlineSize$lg,
    fontWeight: typescaleTokens.headlineWeight$lg,
    lineHeight: typescaleTokens.headlineLineHeight$lg,
    letterSpacing: typescaleTokens.headlineLetterSpacing$lg,
  },
  headline$md: {
    fontFamily: typescaleTokens.headlineFont$md,
    fontSize: typescaleTokens.headlineSize$md,
    fontWeight: typescaleTokens.headlineWeight$md,
    lineHeight: typescaleTokens.headlineLineHeight$md,
    letterSpacing: typescaleTokens.headlineLetterSpacing$md,
  },
  headline$sm: {
    fontFamily: typescaleTokens.headlineFont$sm,
    fontSize: typescaleTokens.headlineSize$sm,
    fontWeight: typescaleTokens.headlineWeight$sm,
    lineHeight: typescaleTokens.headlineLineHeight$sm,
    letterSpacing: typescaleTokens.headlineLetterSpacing$sm,
  },
  title$lg: {
    fontFamily: typescaleTokens.titleFont$lg,
    fontSize: typescaleTokens.titleSize$lg,
    fontWeight: typescaleTokens.titleWeight$lg,
    lineHeight: typescaleTokens.titleLineHeight$lg,
    letterSpacing: typescaleTokens.titleLetterSpacing$lg,
  },
  title$md: {
    fontFamily: typescaleTokens.titleFont$md,
    fontSize: typescaleTokens.titleSize$md,
    fontWeight: typescaleTokens.titleWeight$md,
    lineHeight: typescaleTokens.titleLineHeight$md,
    letterSpacing: typescaleTokens.titleLetterSpacing$md,
  },
  title$sm: {
    fontFamily: typescaleTokens.titleFont$sm,
    fontSize: typescaleTokens.titleSize$sm,
    fontWeight: typescaleTokens.titleWeight$sm,
    lineHeight: typescaleTokens.titleLineHeight$sm,
    letterSpacing: typescaleTokens.titleLetterSpacing$sm,
  },
  body$lg: {
    fontFamily: typescaleTokens.bodyFont$lg,
    fontSize: typescaleTokens.bodySize$lg,
    fontWeight: typescaleTokens.bodyWeight$lg,
    lineHeight: typescaleTokens.bodyLineHeight$lg,
    letterSpacing: typescaleTokens.bodyLetterSpacing$lg,
  },
  body$md: {
    fontFamily: typescaleTokens.bodyFont$md,
    fontSize: typescaleTokens.bodySize$md,
    fontWeight: typescaleTokens.bodyWeight$md,
    lineHeight: typescaleTokens.bodyLineHeight$md,
    letterSpacing: typescaleTokens.bodyLetterSpacing$md,
  },
  body$sm: {
    fontFamily: typescaleTokens.bodyFont$sm,
    fontSize: typescaleTokens.bodySize$sm,
    fontWeight: typescaleTokens.bodyWeight$sm,
    lineHeight: typescaleTokens.bodyLineHeight$sm,
    letterSpacing: typescaleTokens.bodyLetterSpacing$sm,
  },
  label$lg: {
    fontFamily: typescaleTokens.labelFont$lg,
    fontSize: typescaleTokens.labelSize$lg,
    fontWeight: typescaleTokens.labelWeight$lg,
    lineHeight: typescaleTokens.labelLineHeight$lg,
    letterSpacing: typescaleTokens.labelLetterSpacing$lg,
  },
  label$md: {
    fontFamily: typescaleTokens.labelFont$md,
    fontSize: typescaleTokens.labelSize$md,
    fontWeight: typescaleTokens.labelWeight$md,
    lineHeight: typescaleTokens.labelLineHeight$md,
    letterSpacing: typescaleTokens.labelLetterSpacing$md,
  },
  label$sm: {
    fontFamily: typescaleTokens.labelFont$sm,
    fontSize: typescaleTokens.labelSize$sm,
    fontWeight: typescaleTokens.labelWeight$sm,
    lineHeight: typescaleTokens.labelLineHeight$sm,
    letterSpacing: typescaleTokens.labelLetterSpacing$sm,
  },
});
