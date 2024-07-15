import stylex from '@stylexjs/stylex';

import type {
  ITypefaceThemeVars,
  ITypescaleThemeVars,
} from '@/themes/typo.types';

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-ref-typeface.scss
export const typefaceTokens = stylex.defineVars<ITypefaceThemeVars>({
  brand: 'Roboto',
  plain: 'Roboto',
  weightBold: '700',
  weightMedium: '500',
  weightRegular: '400',
});

// Generate a new color palette with Material Theme Builder:
// https://m3.material.io/theme-builder#/custom
// Export to Web (CSS) -> import '--md-sys-typescale-*' from css/tokens.css

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-typescale.scss
export const typescaleTokens = stylex.defineVars<ITypescaleThemeVars>({
  // display-large
  displayFont$lg: typefaceTokens.brand,
  displayLineHeight$lg: '4rem',
  displaySize$lg: '3.5625rem',
  displayLetterSpacing$lg: '-0.015625rem',
  displayWeight$lg: typefaceTokens.weightRegular,

  // display-medium
  displayFont$md: typefaceTokens.brand,
  displayLineHeight$md: '3.25rem',
  displaySize$md: '2.8125rem',
  displayLetterSpacing$md: '0',
  displayWeight$md: typefaceTokens.weightRegular,

  // display-small
  displayFont$sm: typefaceTokens.brand,
  displayLineHeight$sm: '2.75rem',
  displaySize$sm: '2.25rem',
  displayLetterSpacing$sm: '0',
  displayWeight$sm: typefaceTokens.weightRegular,

  // headline-large
  headlineFont$lg: typefaceTokens.brand,
  headlineLineHeight$lg: '2.5rem',
  headlineSize$lg: '2rem',
  headlineLetterSpacing$lg: '0',
  headlineWeight$lg: typefaceTokens.weightRegular,

  // headline-medium
  headlineFont$md: typefaceTokens.brand,
  headlineLineHeight$md: '2.25rem',
  headlineSize$md: '1.75rem',
  headlineLetterSpacing$md: '0',
  headlineWeight$md: typefaceTokens.weightRegular,

  // headline-small
  headlineFont$sm: typefaceTokens.brand,
  headlineLineHeight$sm: '2rem',
  headlineSize$sm: '1.5rem',
  headlineLetterSpacing$sm: '0',
  headlineWeight$sm: typefaceTokens.weightRegular,

  // body-large
  bodyFont$lg: typefaceTokens.plain,
  bodyLineHeight$lg: '1.5rem',
  bodySize$lg: '1rem',
  bodyLetterSpacing$lg: '0.03125rem',
  bodyWeight$lg: typefaceTokens.weightRegular,

  // body-medium
  bodyFont$md: typefaceTokens.plain,
  bodyLineHeight$md: '1.25rem',
  bodySize$md: '0.875rem',
  bodyLetterSpacing$md: '0.015625rem',
  bodyWeight$md: typefaceTokens.weightRegular,

  // body-small
  bodyFont$sm: typefaceTokens.plain,
  bodyLineHeight$sm: '1rem',
  bodySize$sm: '0.75rem',
  bodyLetterSpacing$sm: '0.025rem',
  bodyWeight$sm: typefaceTokens.weightRegular,

  // label-large
  labelFont$lg: typefaceTokens.plain,
  labelLineHeight$lg: '1.25rem',
  labelSize$lg: '0.875rem',
  labelLetterSpacing$lg: '0.00625rem',
  labelWeight$lg: typefaceTokens.weightMedium,

  // label-medium
  labelFont$md: typefaceTokens.plain,
  labelLineHeight$md: '1rem',
  labelSize$md: '0.75rem',
  labelLetterSpacing$md: '0.03125rem',
  labelWeight$md: typefaceTokens.weightMedium,

  // label-small
  labelFont$sm: typefaceTokens.plain,
  labelLineHeight$sm: '1rem',
  labelSize$sm: '0.6875rem',
  labelLetterSpacing$sm: '0.03125rem',
  labelWeight$sm: typefaceTokens.weightRegular,

  // title-large
  titleFont$lg: typefaceTokens.brand,
  titleLineHeight$lg: '1.75rem',
  titleSize$lg: '1.375rem',
  titleLetterSpacing$lg: '0',
  titleWeight$lg: typefaceTokens.weightRegular,

  // title-medium
  titleFont$md: typefaceTokens.plain,
  titleLineHeight$md: '1.5rem',
  titleSize$md: '1rem',
  titleLetterSpacing$md: '0.009375rem',
  titleWeight$md: typefaceTokens.weightMedium,

  // title-small
  titleFont$sm: typefaceTokens.plain,
  titleLineHeight$sm: '1.25rem',
  titleSize$sm: '0.875rem',
  titleLetterSpacing$sm: '0.00625rem',
  titleWeight$sm: typefaceTokens.weightMedium,
});
