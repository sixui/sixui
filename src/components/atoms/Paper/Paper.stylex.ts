import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { shapeTokens } from '@/themes/base/tokens/shape.stylex';

const vars = {
  // container
  containerColor: 'unset',
  containerElevation: 'unset',
  containerShape: shapeTokens.corner$md,

  // outline
  outlineStyle: 'none',
  outlineColor: colorRolesTokens.outlineVariant,
  outlineWidth: '1px',
};

export const paperTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const paperTheme = stylex.createTheme(paperTokens, vars);
