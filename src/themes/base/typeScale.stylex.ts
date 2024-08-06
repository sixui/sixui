import stylex from '@stylexjs/stylex';

import type { ITypeScaleTheme } from './typeScale.types';
import { densityTokens } from './density.stylex';
import { typeFaceTokens } from './typeFace.stylex';

// FIXME: trouver un moyen de moins réduire la taille

const DENSITY_SCALE = `clamp(${densityTokens.scale}, ${densityTokens.minScale}, ${densityTokens.maxScale})`;

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-typescale.scss
export const typeScaleTokens = stylex.defineVars<ITypeScaleTheme>({
  // display-large
  displayFont$lg: typeFaceTokens.brand,
  displayLineHeight$lg: `calc(4rem * ${DENSITY_SCALE})`,
  displaySize$lg: `calc(3.5625rem * ${DENSITY_SCALE})`,
  displayLetterSpacing$lg: `calc(-0.015625rem * ${DENSITY_SCALE})`,
  displayWeight$lg: typeFaceTokens.weightRegular,

  // display-medium
  displayFont$md: typeFaceTokens.brand,
  displayLineHeight$md: `calc(3.25rem * ${DENSITY_SCALE})`,
  displaySize$md: `calc(2.8125rem * ${DENSITY_SCALE})`,
  displayLetterSpacing$md: '0',
  displayWeight$md: typeFaceTokens.weightRegular,

  // display-small
  displayFont$sm: typeFaceTokens.brand,
  displayLineHeight$sm: `calc(2.75rem * ${DENSITY_SCALE})`,
  displaySize$sm: `calc(2.25rem * ${DENSITY_SCALE})`,
  displayLetterSpacing$sm: '0',
  displayWeight$sm: typeFaceTokens.weightRegular,

  // headline-large
  headlineFont$lg: typeFaceTokens.brand,
  headlineLineHeight$lg: `calc(2.5rem * ${DENSITY_SCALE})`,
  headlineSize$lg: `calc(2rem * ${DENSITY_SCALE})`,
  headlineLetterSpacing$lg: '0',
  headlineWeight$lg: typeFaceTokens.weightRegular,

  // headline-medium
  headlineFont$md: typeFaceTokens.brand,
  headlineLineHeight$md: `calc(2.25rem * ${DENSITY_SCALE})`,
  headlineSize$md: `calc(1.75rem * ${DENSITY_SCALE})`,
  headlineLetterSpacing$md: '0',
  headlineWeight$md: typeFaceTokens.weightRegular,

  // headline-small
  headlineFont$sm: typeFaceTokens.brand,
  headlineLineHeight$sm: `calc(2rem * ${DENSITY_SCALE})`,
  headlineSize$sm: `calc(1.5rem * ${DENSITY_SCALE})`,
  headlineLetterSpacing$sm: '0',
  headlineWeight$sm: typeFaceTokens.weightRegular,

  // title-large
  titleFont$lg: typeFaceTokens.brand,
  titleLineHeight$lg: `calc(1.75rem * ${DENSITY_SCALE})`,
  titleSize$lg: `calc(1.375rem * ${DENSITY_SCALE})`,
  titleLetterSpacing$lg: '0',
  titleWeight$lg: typeFaceTokens.weightRegular,

  // title-medium
  titleFont$md: typeFaceTokens.plain,
  titleLineHeight$md: `calc(1.5rem * ${DENSITY_SCALE})`,
  titleSize$md: `calc(1rem * ${DENSITY_SCALE})`,
  titleLetterSpacing$md: `calc(0.009375rem * ${DENSITY_SCALE})`,
  titleWeight$md: typeFaceTokens.weightMedium,

  // title-small
  titleFont$sm: typeFaceTokens.plain,
  titleLineHeight$sm: `calc(1.25rem * ${DENSITY_SCALE})`,
  titleSize$sm: `calc(0.875rem * ${DENSITY_SCALE})`,
  titleLetterSpacing$sm: `calc(0.00625rem * ${DENSITY_SCALE})`,
  titleWeight$sm: typeFaceTokens.weightMedium,

  // body-large
  bodyFont$lg: typeFaceTokens.plain,
  bodyLineHeight$lg: `calc(1.5rem * ${DENSITY_SCALE})`,
  bodySize$lg: `calc(1rem * ${DENSITY_SCALE})`,
  bodyLetterSpacing$lg: `calc(0.03125rem * ${DENSITY_SCALE})`,
  bodyWeight$lg: typeFaceTokens.weightRegular,

  // body-medium
  bodyFont$md: typeFaceTokens.plain,
  bodyLineHeight$md: `calc(1.25rem * ${DENSITY_SCALE})`,
  bodySize$md: `calc(0.875rem * ${DENSITY_SCALE})`,
  bodyLetterSpacing$md: `calc(0.015625rem * ${DENSITY_SCALE})`,
  bodyWeight$md: typeFaceTokens.weightRegular,

  // body-small
  bodyFont$sm: typeFaceTokens.plain,
  bodyLineHeight$sm: `calc(1rem * ${DENSITY_SCALE})`,
  bodySize$sm: `calc(0.75rem * ${DENSITY_SCALE})`,
  bodyLetterSpacing$sm: `calc(0.025rem * ${DENSITY_SCALE})`,
  bodyWeight$sm: typeFaceTokens.weightRegular,

  // label-large
  labelFont$lg: typeFaceTokens.plain,
  labelLineHeight$lg: `calc(1.25rem * ${DENSITY_SCALE})`,
  labelSize$lg: `calc(0.875rem * ${DENSITY_SCALE})`,
  labelLetterSpacing$lg: `calc(0.00625rem * ${DENSITY_SCALE})`,
  labelWeight$lg: typeFaceTokens.weightMedium,

  // label-medium
  labelFont$md: typeFaceTokens.plain,
  labelLineHeight$md: `calc(1rem * ${DENSITY_SCALE})`,
  labelSize$md: `calc(0.75rem * ${DENSITY_SCALE})`,
  labelLetterSpacing$md: `calc(0.03125rem * ${DENSITY_SCALE})`,
  labelWeight$md: typeFaceTokens.weightMedium,

  // label-small
  labelFont$sm: typeFaceTokens.plain,
  labelLineHeight$sm: `calc(1rem * ${DENSITY_SCALE})`,
  labelSize$sm: `calc(0.6875rem * ${DENSITY_SCALE})`,
  labelLetterSpacing$sm: `calc(0.03125rem * ${DENSITY_SCALE})`,
  labelWeight$sm: typeFaceTokens.weightRegular,
});
