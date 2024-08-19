import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { elevationTokens } from '../Elevation/Elevation.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

const MIN_DENSITY = -2;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

const vars = {
  gap: `calc(${spacingTokens.padding$3} * ${scaleTokens.scale} + ${DENSITY})`,
  topSpace: `calc(40px * ${scaleTokens.scale})`,
  bottomSpace: `calc(40px * ${scaleTokens.scale})`,

  // container
  containerColor: colorSchemeTokens.surface,
  containerShape: shapeTokens.corner$none,
  containerWidth: `calc(80px * ${scaleTokens.scale})`,
  containerElevation: elevationTokens.boxShadow$level0,
};

export const navigationRailTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const navigationRailTheme = stylex.createTheme(
  navigationRailTokens,
  vars,
);
