import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { elevationTokens } from '../Elevation/Elevation.stylex';

const vars = {
  // container
  containerColor: colorSchemeTokens.surface,
  containerShape: shapeTokens.corner$none,
  containerWidth: `calc(80px * ${scaleTokens.scale})`,
  containerElevation: elevationTokens.boxShadow$level0,

  // menuIcon
  menuIconSize: `calc(24px * ${scaleTokens.scale})`,
  menuIconColor: colorSchemeTokens.onSurfaceVariant,
  // &:hover
  menuIconColor$hover: colorSchemeTokens.onSurface,
  // &:focus
  menuIconColor$focus: colorSchemeTokens.onSurface,
  // &:pressed
  menuIconColor$pressed: colorSchemeTokens.onSurface,
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
