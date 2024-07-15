import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-ripple.scss

const vars = {
  color$hover: colorRolesVars.onSurface,
  color$pressed: colorRolesVars.onSurface,
  color$dragged: colorRolesVars.onSurface,
  opacity$hover: stateVars.stateLayerOpacity$hover,
  opacity$pressed: stateVars.stateLayerOpacity$pressed,
  opacity$dragged: stateVars.stateLayerOpacity$dragged,
};

export const stateLayerTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const stateLayerTheme = stylex.createTheme(stateLayerTokens, vars);
