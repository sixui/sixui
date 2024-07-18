import stylex from '@stylexjs/stylex';

import type { ITypeScaleTheme } from './typeScale.types';
import { typeFaceTokens } from './typeFace.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-typescale.scss
export const typeScaleTokens = stylex.defineVars<ITypeScaleTheme>({
  // display-large
  displayFont$lg: typeFaceTokens.brand,
  displayLineHeight$lg: '4rem',
  displaySize$lg: '3.5625rem',
  displayLetterSpacing$lg: '-0.015625rem',
  displayWeight$lg: typeFaceTokens.weightRegular,

  // display-medium
  displayFont$md: typeFaceTokens.brand,
  displayLineHeight$md: '3.25rem',
  displaySize$md: '2.8125rem',
  displayLetterSpacing$md: '0',
  displayWeight$md: typeFaceTokens.weightRegular,

  // display-small
  displayFont$sm: typeFaceTokens.brand,
  displayLineHeight$sm: '2.75rem',
  displaySize$sm: '2.25rem',
  displayLetterSpacing$sm: '0',
  displayWeight$sm: typeFaceTokens.weightRegular,

  // headline-large
  headlineFont$lg: typeFaceTokens.brand,
  headlineLineHeight$lg: '2.5rem',
  headlineSize$lg: '2rem',
  headlineLetterSpacing$lg: '0',
  headlineWeight$lg: typeFaceTokens.weightRegular,

  // headline-medium
  headlineFont$md: typeFaceTokens.brand,
  headlineLineHeight$md: '2.25rem',
  headlineSize$md: '1.75rem',
  headlineLetterSpacing$md: '0',
  headlineWeight$md: typeFaceTokens.weightRegular,

  // headline-small
  headlineFont$sm: typeFaceTokens.brand,
  headlineLineHeight$sm: '2rem',
  headlineSize$sm: '1.5rem',
  headlineLetterSpacing$sm: '0',
  headlineWeight$sm: typeFaceTokens.weightRegular,

  // title-large
  titleFont$lg: typeFaceTokens.brand,
  titleLineHeight$lg: '1.75rem',
  titleSize$lg: '1.375rem',
  titleLetterSpacing$lg: '0',
  titleWeight$lg: typeFaceTokens.weightRegular,

  // title-medium
  titleFont$md: typeFaceTokens.plain,
  titleLineHeight$md: '1.5rem',
  titleSize$md: '1rem',
  titleLetterSpacing$md: '0.009375rem',
  titleWeight$md: typeFaceTokens.weightMedium,

  // title-small
  titleFont$sm: typeFaceTokens.plain,
  titleLineHeight$sm: '1.25rem',
  titleSize$sm: '0.875rem',
  titleLetterSpacing$sm: '0.00625rem',
  titleWeight$sm: typeFaceTokens.weightMedium,

  // body-large
  bodyFont$lg: typeFaceTokens.plain,
  bodyLineHeight$lg: '1.5rem',
  bodySize$lg: '1rem',
  bodyLetterSpacing$lg: '0.03125rem',
  bodyWeight$lg: typeFaceTokens.weightRegular,

  // body-medium
  bodyFont$md: typeFaceTokens.plain,
  bodyLineHeight$md: '1.25rem',
  bodySize$md: '0.875rem',
  bodyLetterSpacing$md: '0.015625rem',
  bodyWeight$md: typeFaceTokens.weightRegular,

  // body-small
  bodyFont$sm: typeFaceTokens.plain,
  bodyLineHeight$sm: '1rem',
  bodySize$sm: '0.75rem',
  bodyLetterSpacing$sm: '0.025rem',
  bodyWeight$sm: typeFaceTokens.weightRegular,

  // label-large
  labelFont$lg: typeFaceTokens.plain,
  labelLineHeight$lg: '1.25rem',
  labelSize$lg: '0.875rem',
  labelLetterSpacing$lg: '0.00625rem',
  labelWeight$lg: typeFaceTokens.weightMedium,

  // label-medium
  labelFont$md: typeFaceTokens.plain,
  labelLineHeight$md: '1rem',
  labelSize$md: '0.75rem',
  labelLetterSpacing$md: '0.03125rem',
  labelWeight$md: typeFaceTokens.weightMedium,

  // label-small
  labelFont$sm: typeFaceTokens.plain,
  labelLineHeight$sm: '1rem',
  labelSize$sm: '0.6875rem',
  labelLetterSpacing$sm: '0.03125rem',
  labelWeight$sm: typeFaceTokens.weightRegular,
});
