import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { elevationTokens } from '../Elevation/Elevation.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

const MIN_DENSITY = -1;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

const vars = {
  gap: `calc(40px * ${scaleTokens.scale} + ${DENSITY})`,
  groupGap: `calc(${spacingTokens.padding$3} * ${scaleTokens.scale} + ${DENSITY})`,
  groupTopSpace: `calc(40px * ${scaleTokens.scale})`,
  groupBottomSpace: `calc(40px * ${scaleTokens.scale})`,

  // container
  containerColor: colorSchemeTokens.surface,
  containerShape: shapeTokens.corner$none,
  containerWidth: `calc(80px * ${scaleTokens.scale} + ${DENSITY} * 2)`,
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
