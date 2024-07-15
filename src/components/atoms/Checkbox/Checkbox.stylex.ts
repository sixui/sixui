import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { stateTokens } from '@/themes/base/state.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-checkbox.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-checkbox.scss

const vars = {
  // container
  containerShape: '2px',
  containerSize: '18px',
  // &:disabled
  containerOpacity$disabled: stateTokens.opacity$disabled,

  // selectedContainer
  selectedContainerColor: colorRolesTokens.primary,
  // &:disabled
  selectedContainerOutlineWidth$disabled: '0px',
  selectedContainerColor$disabled: colorRolesTokens.onSurface,
  selectedContainerOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  selectedContainerColor$focus: colorRolesTokens.primary,
  // &:hover
  selectedContainerColor$hover: colorRolesTokens.primary,
  // &:error
  selectedContainerColor$error: colorRolesTokens.error,
  // &:pressed
  selectedContainerColor$pressed: colorRolesTokens.primary,
  // &:error:focus
  selectedContainerColor$error$focus: colorRolesTokens.error,
  // &:error:hover
  selectedContainerColor$error$hover: colorRolesTokens.error,
  // &:error:pressed
  selectedContainerColor$error$pressed: colorRolesTokens.error,

  // outline
  outlineColor: colorRolesTokens.onSurfaceVariant,
  outlineWidth: '2px',
  // &:disabled
  outlineColor$disabled: colorRolesTokens.onSurface,
  outlineWidth$disabled: '2px',
  // &:focus
  outlineColor$focus: colorRolesTokens.onSurface,
  outlineWidth$focus: '2px',
  // &:hover
  outlineColor$hover: colorRolesTokens.onSurface,
  outlineWidth$hover: '2px',
  // &:pressed
  outlineColor$pressed: colorRolesTokens.onSurface,
  outlineWidth$pressed: '2px',
  // &:error
  outlineColor$error: colorRolesTokens.error,
  // &:error:focus
  outlineColor$error$focus: colorRolesTokens.error,
  // &:error:hover
  outlineColor$error$hover: colorRolesTokens.error,
  // &:error:pressed
  outlineColor$error$pressed: colorRolesTokens.error,

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
  selectedIconColor: colorRolesTokens.onPrimary,
  // &:disabled
  selectedIconColor$disabled: colorRolesTokens.surface,
  // &:focus
  selectedIconColor$focus: colorRolesTokens.onPrimary,
  // &:hover
  selectedIconColor$hover: colorRolesTokens.onPrimary,
  // &:pressed
  selectedIconColor$pressed: colorRolesTokens.onPrimary,
  // &:error
  selectedIconColor$error: colorRolesTokens.onError,
  // &:error:focus
  selectedIconColor$error$focus: colorRolesTokens.onError,
  // &:error:hover
  selectedIconColor$error$hover: colorRolesTokens.onError,
  // &:error:pressed
  selectedIconColor$error$pressed: colorRolesTokens.onError,

  // stateLayer
  stateLayerShape: shapeTokens.corner$full,
  stateLayerSize: '40px',
  // &:hover
  stateLayerColor$hover: colorRolesTokens.onSurface,
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorRolesTokens.primary,
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,
  // &:error:hover
  stateLayerColor$error$hover: colorRolesTokens.error,
  stateLayerOpacity$error$hover: stateTokens.stateLayerOpacity$hover,
  // &:error:pressed
  stateLayerColor$error$pressed: colorRolesTokens.error,
  stateLayerOpacity$error$pressed: stateTokens.stateLayerOpacity$pressed,

  // selectedStateLayer
  // &:hover
  selectedStateLayerColor$hover: colorRolesTokens.primary,
  selectedStateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  selectedStateLayerColor$pressed: colorRolesTokens.onSurface,
  selectedStateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,
};

export const checkboxTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const checkboxTheme = stylex.createTheme(checkboxTokens, vars);
