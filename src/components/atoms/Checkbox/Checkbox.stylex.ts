import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-checkbox.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-checkbox.scss

const vars = {
  // container
  containerShape: '2px',
  containerSize: '18px',
  // &:disabled
  containerOpacity$disabled: stateVars.opacity$disabled,

  // selectedContainer
  selectedContainerColor: colorRolesVars.primary,
  // &:disabled
  selectedContainerOutlineWidth$disabled: '0px',
  selectedContainerColor$disabled: colorRolesVars.onSurface,
  selectedContainerOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  selectedContainerColor$focus: colorRolesVars.primary,
  // &:hover
  selectedContainerColor$hover: colorRolesVars.primary,
  // &:error
  selectedContainerColor$error: colorRolesVars.error,
  // &:pressed
  selectedContainerColor$pressed: colorRolesVars.primary,
  // &:error:focus
  selectedContainerColor$error$focus: colorRolesVars.error,
  // &:error:hover
  selectedContainerColor$error$hover: colorRolesVars.error,
  // &:error:pressed
  selectedContainerColor$error$pressed: colorRolesVars.error,

  // outline
  outlineColor: colorRolesVars.onSurfaceVariant,
  outlineWidth: '2px',
  // &:disabled
  outlineColor$disabled: colorRolesVars.onSurface,
  outlineWidth$disabled: '2px',
  // &:focus
  outlineColor$focus: colorRolesVars.onSurface,
  outlineWidth$focus: '2px',
  // &:hover
  outlineColor$hover: colorRolesVars.onSurface,
  outlineWidth$hover: '2px',
  // &:pressed
  outlineColor$pressed: colorRolesVars.onSurface,
  outlineWidth$pressed: '2px',
  // &:error
  outlineColor$error: colorRolesVars.error,
  // &:error:focus
  outlineColor$error$focus: colorRolesVars.error,
  // &:error:hover
  outlineColor$error$hover: colorRolesVars.error,
  // &:error:pressed
  outlineColor$error$pressed: colorRolesVars.error,

  // selectedOutline
  selectedOutlineWidth: '0px',
  // &:focus
  selectedOutlineWidth$focus: '0px',
  // &:hover
  selectedOutlineWidth$hover: '0px',
  // &:pressed
  selectedOutlineWidth$pressed: '0px',

  // icon
  iconSize: '18px',

  // selectedIcon
  selectedIconColor: colorRolesVars.onPrimary,
  // &:disabled
  selectedIconColor$disabled: colorRolesVars.surface,
  // &:focus
  selectedIconColor$focus: colorRolesVars.onPrimary,
  // &:hover
  selectedIconColor$hover: colorRolesVars.onPrimary,
  // &:pressed
  selectedIconColor$pressed: colorRolesVars.onPrimary,
  // &:error
  selectedIconColor$error: colorRolesVars.onError,
  // &:error:focus
  selectedIconColor$error$focus: colorRolesVars.onError,
  // &:error:hover
  selectedIconColor$error$hover: colorRolesVars.onError,
  // &:error:pressed
  selectedIconColor$error$pressed: colorRolesVars.onError,

  // stateLayer
  stateLayerShape: shapeVars.corner$full,
  stateLayerSize: '40px',
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurface,
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.primary,
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,
  // &:error:hover
  stateLayerColor$error$hover: colorRolesVars.error,
  stateLayerOpacity$error$hover: stateVars.stateLayerOpacity$hover,
  // &:error:pressed
  stateLayerColor$error$pressed: colorRolesVars.error,
  stateLayerOpacity$error$pressed: stateVars.stateLayerOpacity$pressed,

  // selectedStateLayer
  // &:hover
  selectedStateLayerColor$hover: colorRolesVars.primary,
  selectedStateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  selectedStateLayerColor$pressed: colorRolesVars.onSurface,
  selectedStateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,
};

export const checkboxTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const checkboxTheme = stylex.createTheme(checkboxTokens, vars);
