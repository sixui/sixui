import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

const MIN_DENSITY = -1;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

const vars = {
  leadingSpace: spacingTokens.padding$4,
  trailingSpace: spacingTokens.padding$4,
  topSpace: `calc(${spacingTokens.padding$4} + ${DENSITY})`,
  bottomSpace: `calc(${spacingTokens.padding$4} + ${DENSITY})`,
  textColor: colorSchemeTokens.onSurface,
  // &:actionable
  leadingSpace$actionable: spacingTokens.padding$4,
  trailingSpace$actionable: spacingTokens.padding$4,
  topSpace$actionable: `calc(${spacingTokens.padding$4} + ${DENSITY})`,
  bottomSpace$actionable: `calc(${spacingTokens.padding$4} + ${DENSITY})`,
};

export const cardContentTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const cardContentTheme = stylex.createTheme(cardContentTokens, vars);
