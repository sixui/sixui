import stylex from '@stylexjs/stylex';

import type { ITypeScaleTheme } from './typeScale.types';
import { typeFaceTokens } from './typeFace.stylex';
import { scaleTokens } from './scale.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-typescale.scss

const vars = {
  // display-large
  displayFont$lg: typeFaceTokens.brand,
  displayLineHeight$lg: `calc(4rem * ${scaleTokens.scale})`,
  displaySize$lg: `calc(3.5625rem * ${scaleTokens.scale})`,
  displayLetterSpacing$lg: `calc(-0.015625rem * ${scaleTokens.scale})`,
  displayWeight$lg: typeFaceTokens.weightRegular,

  // display-medium
  displayFont$md: typeFaceTokens.brand,
  displayLineHeight$md: `calc(3.25rem * ${scaleTokens.scale})`,
  displaySize$md: `calc(2.8125rem * ${scaleTokens.scale})`,
  displayLetterSpacing$md: '0rem',
  displayWeight$md: typeFaceTokens.weightRegular,

  // display-small
  displayFont$sm: typeFaceTokens.brand,
  displayLineHeight$sm: `calc(2.75rem * ${scaleTokens.scale})`,
  displaySize$sm: `calc(2.25rem * ${scaleTokens.scale})`,
  displayLetterSpacing$sm: '0rem',
  displayWeight$sm: typeFaceTokens.weightRegular,

  // headline-large
  headlineFont$lg: typeFaceTokens.brand,
  headlineLineHeight$lg: `calc(2.5rem * ${scaleTokens.scale})`,
  headlineSize$lg: `calc(2rem * ${scaleTokens.scale})`,
  headlineLetterSpacing$lg: '0rem',
  headlineWeight$lg: typeFaceTokens.weightRegular,

  // headline-medium
  headlineFont$md: typeFaceTokens.brand,
  headlineLineHeight$md: `calc(2.25rem * ${scaleTokens.scale})`,
  headlineSize$md: `calc(1.75rem * ${scaleTokens.scale})`,
  headlineLetterSpacing$md: '0rem',
  headlineWeight$md: typeFaceTokens.weightRegular,

  // headline-small
  headlineFont$sm: typeFaceTokens.brand,
  headlineLineHeight$sm: `calc(2rem * ${scaleTokens.scale})`,
  headlineSize$sm: `calc(1.5rem * ${scaleTokens.scale})`,
  headlineLetterSpacing$sm: '0rem',
  headlineWeight$sm: typeFaceTokens.weightRegular,

  // title-large
  titleFont$lg: typeFaceTokens.brand,
  titleLineHeight$lg: `calc(1.75rem * ${scaleTokens.scale})`,
  titleSize$lg: `calc(1.375rem * ${scaleTokens.scale})`,
  titleLetterSpacing$lg: '0rem',
  titleWeight$lg: typeFaceTokens.weightRegular,

  // title-medium
  titleFont$md: typeFaceTokens.plain,
  titleLineHeight$md: `calc(1.5rem * ${scaleTokens.scale})`,
  titleSize$md: `calc(1rem * ${scaleTokens.scale})`,
  titleLetterSpacing$md: `calc(0.009375rem * ${scaleTokens.scale})`,
  titleWeight$md: typeFaceTokens.weightMedium,

  // title-small
  titleFont$sm: typeFaceTokens.plain,
  titleLineHeight$sm: `calc(1.25rem * ${scaleTokens.scale})`,
  titleSize$sm: `calc(0.875rem * ${scaleTokens.scale})`,
  titleLetterSpacing$sm: `calc(0.00625rem * ${scaleTokens.scale})`,
  titleWeight$sm: typeFaceTokens.weightMedium,

  // body-large
  bodyFont$lg: typeFaceTokens.plain,
  bodyLineHeight$lg: `calc(1.5rem * ${scaleTokens.scale})`,
  bodySize$lg: `calc(1rem * ${scaleTokens.scale})`,
  bodyLetterSpacing$lg: `calc(0.03125rem * ${scaleTokens.scale})`,
  bodyWeight$lg: typeFaceTokens.weightRegular,

  // body-medium
  bodyFont$md: typeFaceTokens.plain,
  bodyLineHeight$md: `calc(1.25rem * ${scaleTokens.scale})`,
  bodySize$md: `calc(0.875rem * ${scaleTokens.scale})`,
  bodyLetterSpacing$md: `calc(0.015625rem * ${scaleTokens.scale})`,
  bodyWeight$md: typeFaceTokens.weightRegular,

  // body-small
  bodyFont$sm: typeFaceTokens.plain,
  bodyLineHeight$sm: `calc(1rem * ${scaleTokens.scale})`,
  bodySize$sm: `calc(0.75rem * ${scaleTokens.scale})`,
  bodyLetterSpacing$sm: `calc(0.025rem * ${scaleTokens.scale})`,
  bodyWeight$sm: typeFaceTokens.weightRegular,

  // label-large
  labelFont$lg: typeFaceTokens.plain,
  labelLineHeight$lg: `calc(1.25rem * ${scaleTokens.scale})`,
  labelSize$lg: `calc(0.875rem * ${scaleTokens.scale})`,
  labelLetterSpacing$lg: `calc(0.00625rem * ${scaleTokens.scale})`,
  labelWeight$lg: typeFaceTokens.weightMedium,

  // label-medium
  labelFont$md: typeFaceTokens.plain,
  labelLineHeight$md: `calc(1rem * ${scaleTokens.scale})`,
  labelSize$md: `calc(0.75rem * ${scaleTokens.scale})`,
  labelLetterSpacing$md: `calc(0.03125rem * ${scaleTokens.scale})`,
  labelWeight$md: typeFaceTokens.weightMedium,

  // label-small
  labelFont$sm: typeFaceTokens.plain,
  labelLineHeight$sm: `calc(1rem * ${scaleTokens.scale})`,
  labelSize$sm: `calc(0.6875rem * ${scaleTokens.scale})`,
  labelLetterSpacing$sm: `calc(0.03125rem * ${scaleTokens.scale})`,
  labelWeight$sm: typeFaceTokens.weightRegular,
};

export const typeScaleTokens = stylex.defineVars<ITypeScaleTheme>(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const typeScaleTheme = stylex.createTheme(typeScaleTokens, vars);
