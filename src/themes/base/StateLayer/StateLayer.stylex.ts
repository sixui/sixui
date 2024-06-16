import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IStateLayerStyleVarKey } from '@/components/utils/StateLayer';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { stateVars } from '../vars/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-ripple.scss

const vars: IStyleVars<IStateLayerStyleVarKey> = {
  color$hover: colorRolesVars.onSurface,
  color$pressed: colorRolesVars.onSurface,
  color$dragged: colorRolesVars.onSurface,
  opacity$hover: stateVars.stateLayerOpacity$hover,
  opacity$pressed: stateVars.stateLayerOpacity$pressed,
  opacity$dragged: stateVars.stateLayerOpacity$dragged,
};

export const componentVars = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
