import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IListItemStyleVarKey } from '@/components/atoms/ListItem';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { stateVars } from '../vars/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-list-item.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-list.scss

const vars: Partial<IStyleVars<IListItemStyleVarKey>> = {
  leadingSpace: '16px',
  trailingSpace: '16px',
  topSpace: '12px',
  bottomSpace: '12px',

  // container
  containerColor: 'transparent',
  containerOpacity: '1',
  containerShape: shapeVars.corner$none,
  containerHeight$oneLine: '48px',
  containerHeight$twoLine: '56px',
  containerHeight$threeLine: '72px',
  // &:disabled
  containerColor$disabled: 'transparent',
  containerOpacity$disabled: stateVars.containerOpacity$disabled,

  // selectedContainer
  selectedContainerColor: colorRolesVars.primaryContainer,
  selectedContainerOpacity: '1',

  // text
  textColor: colorRolesVars.onSurface,
  // &:disabled
  textColor$disabled: colorRolesVars.onSurface,
  textOpacity$disabled: stateVars.opacity$disabled,
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
  // &:disabled
  nonTextColor$disabled: colorRolesVars.onSurfaceVariant,
  nonTextOpacity$disabled: stateVars.opacity$disabled,
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
  leadingIconSize: '18px',
  // &:disabled
  leadingIconColor$disabled: colorRolesVars.onSurface,
  leadingIconOpacity$disabled: stateVars.opacity$disabled,
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
  trailingIconSize: '18px',
  // &:disabled
  trailingIconColor$disabled: colorRolesVars.onSurface,
  trailingIconOpacity$disabled: stateVars.opacity$disabled,
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

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IListItemStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
