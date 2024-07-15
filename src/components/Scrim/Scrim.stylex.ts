import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';

const vars = {
  containerColor$darken: `color-mix(in srgb, ${colorRolesTokens.scrim} 50%, transparent)`,
  containerColor$lighten: `rgba(255, 255, 255, 0.5)`,
};

export const scrimTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const scrimTheme = stylex.createTheme(scrimTokens, vars);
