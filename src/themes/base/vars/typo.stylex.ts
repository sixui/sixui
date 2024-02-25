import stylex from '@stylexjs/stylex';

export type ITypescaleSize = 'sm' | 'md' | 'lg';
export type ITypescaleUsage =
  | 'display'
  | 'headline'
  | 'body'
  | 'label'
  | 'title';

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-ref-typeface.scss
export const typefaceVars = stylex.defineVars({
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
export const typescaleVars = stylex.defineVars({
  // display-large
  displayFont$lg: typefaceVars.brand,
  displayLineHeight$lg: '4rem',
  displaySize$lg: '3.5625rem',
  displayLetterSpacing$lg: '-0.015625rem',
  displayWeight$lg: typefaceVars.weightRegular,

  // display-medium
  displayFont$md: typefaceVars.brand,
  displayLineHeight$md: '3.25rem',
  displaySize$md: '2.8125rem',
  displayLetterSpacing$md: '0',
  displayWeight$md: typefaceVars.weightRegular,

  // display-small
  displayFont$sm: typefaceVars.brand,
  displayLineHeight$sm: '2.75rem',
  displaySize$sm: '2.25rem',
  displayLetterSpacing$sm: '0',
  displayWeight$sm: typefaceVars.weightRegular,

  // headline-large
  headlineFont$lg: typefaceVars.brand,
  headlineLineHeight$lg: '2.5rem',
  headlineSize$lg: '2rem',
  headlineLetterSpacing$lg: '0',
  headlineWeight$lg: typefaceVars.weightRegular,

  // headline-medium
  headlineFont$md: typefaceVars.brand,
  headlineLineHeight$md: '2.25rem',
  headlineSize$md: '1.75rem',
  headlineLetterSpacing$md: '0',
  headlineWeight$md: typefaceVars.weightRegular,

  // headline-small
  headlineFont$sm: typefaceVars.brand,
  headlineLineHeight$sm: '2rem',
  headlineSize$sm: '1.5rem',
  headlineLetterSpacing$sm: '0',
  headlineWeight$sm: typefaceVars.weightRegular,

  // body-large
  bodyFont$lg: typefaceVars.plain,
  bodyLineHeight$lg: '1.5rem',
  bodySize$lg: '1rem',
  bodyLetterSpacing$lg: '0.03125rem',
  bodyWeight$lg: typefaceVars.weightRegular,

  // body-medium
  bodyFont$md: typefaceVars.plain,
  bodyLineHeight$md: '1.25rem',
  bodySize$md: '0.875rem',
  bodyLetterSpacing$md: '0.015625rem',
  bodyWeight$md: typefaceVars.weightRegular,

  // body-small
  bodyFont$sm: typefaceVars.plain,
  bodyLineHeight$sm: '1rem',
  bodySize$sm: '0.75rem',
  bodyLetterSpacing$sm: '0.025rem',
  bodyWeight$sm: typefaceVars.weightRegular,

  // label-large
  labelFont$lg: typefaceVars.plain,
  labelLineHeight$lg: '1.25rem',
  labelSize$lg: '0.875rem',
  labelLetterSpacing$lg: '0.00625rem',
  labelWeight$lg: typefaceVars.weightMedium,

  // label-medium
  labelFont$md: typefaceVars.plain,
  labelLineHeight$md: '1rem',
  labelSize$md: '0.75rem',
  labelLetterSpacing$md: '0.03125rem',
  labelWeight$md: typefaceVars.weightMedium,

  // label-small
  labelFont$sm: typefaceVars.plain,
  labelLineHeight$sm: '1rem',
  labelSize$sm: '0.6875rem',
  labelLetterSpacing$sm: '0.03125rem',
  labelWeight$sm: typefaceVars.weightRegular,

  // title-large
  titleFont$lg: typefaceVars.brand,
  titleLineHeight$lg: '1.75rem',
  titleSize$lg: '1.375rem',
  titleLetterSpacing$lg: '0',
  titleWeight$lg: typefaceVars.weightRegular,

  // title-medium
  titleFont$md: typefaceVars.plain,
  titleLineHeight$md: '1.5rem',
  titleSize$md: '1rem',
  titleLetterSpacing$md: '0.009375rem',
  titleWeight$md: typefaceVars.weightMedium,

  // title-small
  titleFont$sm: typefaceVars.plain,
  titleLineHeight$sm: '1.25rem',
  titleSize$sm: '0.875rem',
  titleLetterSpacing$sm: '0.00625rem',
  titleWeight$sm: typefaceVars.weightMedium,
});
