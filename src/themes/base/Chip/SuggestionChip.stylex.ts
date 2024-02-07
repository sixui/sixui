import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IChipStyleVarKey } from '@/components/atoms/Chip';
import { componentVars as baseComponentVars } from './Chip.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-suggestion-chip.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-suggestion-chip.scss
const vars: Partial<IStyleVars<IChipStyleVarKey>> = {
  // flatContainer
  flatContainerColor: colorRolesVars.surfaceContainerLow,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurface,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onSurface,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
