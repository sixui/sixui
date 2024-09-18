import stylex from '@stylexjs/stylex';

import type { ITypeScaleTheme } from './typeScale.types';
import { scaleTokens } from './scale.stylex';
import { typeFaceTokens } from './typeFace.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-typescale.scss

const vars = {
  // display-large
  displayFont$lg: typeFaceTokens.brand,
  displayLineHeight$lg: `calc(64px * ${scaleTokens.scale})`,
  displaySize$lg: `calc(57px * ${scaleTokens.scale})`,
  displayLetterSpacing$lg: `calc(-0.25px * ${scaleTokens.scale})`,
  displayWeight$lg: typeFaceTokens.weightRegular,

  // display-medium
  displayFont$md: typeFaceTokens.brand,
  displayLineHeight$md: `calc(52px * ${scaleTokens.scale})`,
  displaySize$md: `calc(45px * ${scaleTokens.scale})`,
  displayLetterSpacing$md: '0',
  displayWeight$md: typeFaceTokens.weightRegular,

  // display-small
  displayFont$sm: typeFaceTokens.brand,
  displayLineHeight$sm: `calc(44px * ${scaleTokens.scale})`,
  displaySize$sm: `calc(36px * ${scaleTokens.scale})`,
  displayLetterSpacing$sm: '0',
  displayWeight$sm: typeFaceTokens.weightRegular,

  // headline-large
  headlineFont$lg: typeFaceTokens.brand,
  headlineLineHeight$lg: `calc(40px * ${scaleTokens.scale})`,
  headlineSize$lg: `calc(32px * ${scaleTokens.scale})`,
  headlineLetterSpacing$lg: '0',
  headlineWeight$lg: typeFaceTokens.weightRegular,

  // headline-medium
  headlineFont$md: typeFaceTokens.brand,
  headlineLineHeight$md: `calc(36px * ${scaleTokens.scale})`,
  headlineSize$md: `calc(28px * ${scaleTokens.scale})`,
  headlineLetterSpacing$md: '0',
  headlineWeight$md: typeFaceTokens.weightRegular,

  // headline-small
  headlineFont$sm: typeFaceTokens.brand,
  headlineLineHeight$sm: `calc(32px * ${scaleTokens.scale})`,
  headlineSize$sm: `calc(24px * ${scaleTokens.scale})`,
  headlineLetterSpacing$sm: '0',
  headlineWeight$sm: typeFaceTokens.weightRegular,

  // title-large
  titleFont$lg: typeFaceTokens.brand,
  titleLineHeight$lg: `calc(28px * ${scaleTokens.scale})`,
  titleSize$lg: `calc(22px * ${scaleTokens.scale})`,
  titleLetterSpacing$lg: '0',
  titleWeight$lg: typeFaceTokens.weightRegular,

  // title-medium
  titleFont$md: typeFaceTokens.plain,
  titleLineHeight$md: `calc(24px * ${scaleTokens.scale})`,
  titleSize$md: `calc(16px * ${scaleTokens.scale})`,
  titleLetterSpacing$md: `calc(0.15px * ${scaleTokens.scale})`,
  titleWeight$md: typeFaceTokens.weightMedium,

  // title-small
  titleFont$sm: typeFaceTokens.plain,
  titleLineHeight$sm: `calc(20px * ${scaleTokens.scale})`,
  titleSize$sm: `calc(14px * ${scaleTokens.scale})`,
  titleLetterSpacing$sm: `calc(0.1px * ${scaleTokens.scale})`,
  titleWeight$sm: typeFaceTokens.weightMedium,

  // body-large
  bodyFont$lg: typeFaceTokens.plain,
  bodyLineHeight$lg: `calc(24px * ${scaleTokens.scale})`,
  bodySize$lg: `calc(16px * ${scaleTokens.scale})`,
  bodyLetterSpacing$lg: `calc(0.5px * ${scaleTokens.scale})`,
  bodyWeight$lg: typeFaceTokens.weightRegular,

  // body-medium
  bodyFont$md: typeFaceTokens.plain,
  bodyLineHeight$md: `calc(20px * ${scaleTokens.scale})`,
  bodySize$md: `calc(14px * ${scaleTokens.scale})`,
  bodyLetterSpacing$md: `calc(0.25px * ${scaleTokens.scale})`,
  bodyWeight$md: typeFaceTokens.weightRegular,

  // body-small
  bodyFont$sm: typeFaceTokens.plain,
  bodyLineHeight$sm: `calc(16px * ${scaleTokens.scale})`,
  bodySize$sm: `calc(12px * ${scaleTokens.scale})`,
  bodyLetterSpacing$sm: `calc(0.4px * ${scaleTokens.scale})`,
  bodyWeight$sm: typeFaceTokens.weightRegular,

  // label-large
  labelFont$lg: typeFaceTokens.plain,
  labelLineHeight$lg: `calc(20px * ${scaleTokens.scale})`,
  labelSize$lg: `calc(14px * ${scaleTokens.scale})`,
  labelLetterSpacing$lg: `calc(0.1px * ${scaleTokens.scale})`,
  labelWeight$lg: typeFaceTokens.weightMedium,
  labelWeight$lg$prominent: typeFaceTokens.weightBold,

  // label-medium
  labelFont$md: typeFaceTokens.plain,
  labelLineHeight$md: `calc(16px * ${scaleTokens.scale})`,
  labelSize$md: `calc(12px * ${scaleTokens.scale})`,
  labelLetterSpacing$md: `calc(0.5px * ${scaleTokens.scale})`,
  labelWeight$md: typeFaceTokens.weightMedium,
  labelWeight$md$prominent: typeFaceTokens.weightBold,

  // label-small
  labelFont$sm: typeFaceTokens.plain,
  labelLineHeight$sm: `calc(16px * ${scaleTokens.scale})`,
  labelSize$sm: `calc(11px * ${scaleTokens.scale})`,
  labelLetterSpacing$sm: `calc(0.5px * ${scaleTokens.scale})`,
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
