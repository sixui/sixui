import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IListItemStyleVarKey } from '@/components/atoms/ListItem';
import { componentVars as baseComponentVars } from './ListItem.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { stateVars } from '../vars/state.stylex';

const vars: Partial<IStyleVars<IListItemStyleVarKey>> = {
  // container
  containerColor: 'transparent',

  // selectedContainer
  selectedContainerColor: colorRolesVars.primaryContainer,
  selectedContainerOpacity: '1',

  // text
  textColor: colorRolesVars.onSurface,
  // &:focus
  textColor$focus: colorRolesVars.onSurface,
  // &:hover
  textColor$hover: colorRolesVars.onSurface,
  // &:pressed
  textColor$pressed: colorRolesVars.onSurface,

  // selectedText
  selectedTextColor: colorRolesVars.onPrimaryContainer,
  // &:focus
  selectedTextColor$focus: colorRolesVars.onPrimaryContainer,
  // &:hover
  selectedTextColor$hover: colorRolesVars.onPrimaryContainer,
  // &:pressed
  selectedTextColor$pressed: colorRolesVars.onPrimaryContainer,

  // nonText
  nonTextColor: colorRolesVars.onSurfaceVariant,
  // &:focus
  nonTextColor$focus: colorRolesVars.onSurfaceVariant,
  // &:hover
  nonTextColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  nonTextColor$pressed: colorRolesVars.onSurfaceVariant,

  // selectedNonText
  selectedNonTextColor: colorRolesVars.onPrimaryContainer,
  // &:focus
  selectedNonTextColor$focus: colorRolesVars.onPrimaryContainer,
  // &:hover
  selectedNonTextColor$hover: colorRolesVars.onPrimaryContainer,
  // &:pressed
  selectedNonTextColor$pressed: colorRolesVars.onPrimaryContainer,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurface,
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.primary,
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // leadingIcon
  leadingIconColor: colorRolesVars.onSurfaceVariant,
  // &:focus
  leadingIconColor$focus: colorRolesVars.onSurfaceVariant,
  // &:hover
  leadingIconColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  leadingIconColor$pressed: colorRolesVars.onSurfaceVariant,

  // selectedLeadingIcon
  selectedLeadingIconColor: colorRolesVars.primary,
  // &:focus
  selectedLeadingIconColor$focus: colorRolesVars.primary,
  // &:hover
  selectedLeadingIconColor$hover: colorRolesVars.primary,
  // &:pressed
  selectedLeadingIconColor$pressed: colorRolesVars.primary,

  // trailingIcon
  trailingIconColor: colorRolesVars.onSurfaceVariant,
  // &:focus
  trailingIconColor$focus: colorRolesVars.onSurfaceVariant,
  // &:hover
  trailingIconColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  trailingIconColor$pressed: colorRolesVars.onSurfaceVariant,

  // selectedLeadingIcon
  selectedTrailingIconColor: colorRolesVars.primary,
  // &:focus
  selectedTrailingIconColor$focus: colorRolesVars.primary,
  // &:hover
  selectedTrailingIconColor$hover: colorRolesVars.primary,
  // &:pressed
  selectedTrailingIconColor$pressed: colorRolesVars.primary,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
