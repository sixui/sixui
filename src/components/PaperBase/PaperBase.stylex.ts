import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { elevationTokens } from '@/components/Elevation/Elevation.stylex';

const vars = {
  // container
  containerColor: colorSchemeTokens.surface,
  containerElevation: elevationTokens.boxShadow$level0,
  containerShape: shapeTokens.corner$md,

  // outline
  outlineStyle: 'none',
  outlineColor: colorSchemeTokens.outlineVariant,
  outlineWidth: '1px',
};

export const paperBaseTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const paperBaseTheme = stylex.createTheme(paperBaseTokens, vars);
