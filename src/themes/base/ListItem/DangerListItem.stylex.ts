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
  selectedContainerColor: colorRolesVars.errorContainer,
  selectedContainerOpacity: '1',

  // text
  textColor: colorRolesVars.error,
  // &:focus
  textColor$focus: colorRolesVars.error,
  // &:hover
  textColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  textColor$pressed: colorRolesVars.onErrorContainer,

  // selectedText
  selectedTextColor: colorRolesVars.onErrorContainer,
  // &:focus
  selectedTextColor$focus: colorRolesVars.onErrorContainer,
  // &:hover
  selectedTextColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  selectedTextColor$pressed: colorRolesVars.onErrorContainer,

  // nonText
  nonTextColor: colorRolesVars.error,
  // &:focus
  nonTextColor$focus: colorRolesVars.onErrorContainer,
  // &:hover
  nonTextColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  nonTextColor$pressed: colorRolesVars.onErrorContainer,

  // selectedNonText
  selectedNonTextColor: colorRolesVars.onErrorContainer,
  // &:focus
  selectedNonTextColor$focus: colorRolesVars.onErrorContainer,
  // &:hover
  selectedNonTextColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  selectedNonTextColor$pressed: colorRolesVars.onErrorContainer,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.errorContainer,
  stateLayerOpacity$hover: '1',
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.error,
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // leadingIcon
  leadingIconColor: colorRolesVars.error,
  // &:focus
  leadingIconColor$focus: colorRolesVars.onErrorContainer,
  // &:hover
  leadingIconColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  leadingIconColor$pressed: colorRolesVars.onErrorContainer,

  // selectedLeadingIcon
  selectedLeadingIconColor: colorRolesVars.onErrorContainer,
  // &:focus
  selectedLeadingIconColor$focus: colorRolesVars.onErrorContainer,
  // &:hover
  selectedLeadingIconColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  selectedLeadingIconColor$pressed: colorRolesVars.onErrorContainer,

  // trailingIcon
  trailingIconColor: colorRolesVars.onSurfaceVariant,
  // &:focus
  trailingIconColor$focus: colorRolesVars.onErrorContainer,
  // &:hover
  trailingIconColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  trailingIconColor$pressed: colorRolesVars.onErrorContainer,

  // selectedLeadingIcon
  selectedTrailingIconColor: colorRolesVars.onErrorContainer,
  // &:focus
  selectedTrailingIconColor$focus: colorRolesVars.onErrorContainer,
  // &:hover
  selectedTrailingIconColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  selectedTrailingIconColor$pressed: colorRolesVars.onErrorContainer,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
