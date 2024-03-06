import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IChipStyleVarKey } from '@/components/atoms/Chip';
import { componentVars as baseComponentVars } from './Chip.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { shapeVars } from '../vars/shape.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-input-chip.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-input-chip.scss

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
  stateLayerColor$pressed: colorRolesVars.onSurfaceVariant,

  // selectedStateLayer
  // &:hover
  selectedStateLayerColor$hover: colorRolesVars.onSecondaryContainer,
  // &:pressed
  selectedStateLayerColor$pressed: colorRolesVars.onSecondaryContainer,

  /**
   * Leading Icon
   */

  iconLeadingSpace: '8px',

  // selectedIcon
  selectedIconColor: colorRolesVars.primary,
  // &:focus
  selectedIconColor$focus: colorRolesVars.primary,
  // &:hover
  selectedIconColor$hover: colorRolesVars.primary,
  // &:pressed
  selectedIconColor$pressed: colorRolesVars.primary,

  /**
   * Trailing Icon
   */

  trailingIconTrailingSpace: '8px',

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

  /**
   * Avatar
   */

  // avatar
  avatarShape: shapeVars.corner$full,
  avatarSize: '24px',
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
