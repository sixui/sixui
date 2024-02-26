import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IChipStyleVarKey } from '@/components/atoms/Chip';
import { componentVars as baseComponentVars } from './Chip.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filter-chip.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filter-chip.scss

const vars: Partial<IStyleVars<IChipStyleVarKey>> = {
  /**
   * Flat Container
   */

  // selectedFlatContainer
  selectedFlatContainerColor: colorRolesVars.secondaryContainer,
  // &:disabled
  selectedFlatContainerColor$disabled: colorRolesVars.onSurface,

  /**
   * Outline
   */

  // selectedFlatOutline
  selectedOutlineWidth: '0',

  /**
   * Elevated Container
   */

  // selectedElevatedContainer
  selectedElevatedContainerColor: colorRolesVars.secondaryContainer,

  /**
   * Label
   */

  // selectedLabel
  selectedLabelTextColor: colorRolesVars.onSecondaryContainer,
  // &:hover
  selectedLabelTextColor$hover: colorRolesVars.onSecondaryContainer,
  // &:focus
  selectedLabelTextColor$focus: colorRolesVars.onSecondaryContainer,
  // &:pressed
  selectedLabelTextColor$pressed: colorRolesVars.onSecondaryContainer,

  /**
   * State Layer
   */

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onSecondaryContainer,

  // selectedStateLayer
  // &:hover
  selectedStateLayerColor$hover: colorRolesVars.onSecondaryContainer,
  // &:pressed
  selectedStateLayerColor$pressed: colorRolesVars.onSurfaceVariant,

  /**
   * Leading Icon
   */

  // selectedIcon
  selectedIconColor: colorRolesVars.onSecondaryContainer,
  // &:focus
  selectedIconColor$focus: colorRolesVars.onSecondaryContainer,
  // &:hover
  selectedIconColor$hover: colorRolesVars.onSecondaryContainer,
  // &:pressed
  selectedIconColor$pressed: colorRolesVars.onSecondaryContainer,

  /**
   * Trailing Icon
   */

  // trailingIcon
  trailingIconColor: colorRolesVars.onSurfaceVariant,
  // &:disabled
  trailingIconColor$disabled: colorRolesVars.onSurface,
  // &:focus
  trailingIconColor$focus: colorRolesVars.onSurfaceVariant,
  // &:hover
  trailingIconColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  trailingIconColor$pressed: colorRolesVars.onSurfaceVariant,

  // selectedTrailingIcon
  selectedTrailingIconColor: colorRolesVars.onSecondaryContainer,
  // &:focus
  selectedTrailingIconColor$focus: colorRolesVars.onSecondaryContainer,
  // &:hover
  selectedTrailingIconColor$hover: colorRolesVars.onSecondaryContainer,
  // &:pressed
  selectedTrailingIconColor$pressed: colorRolesVars.onSecondaryContainer,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
