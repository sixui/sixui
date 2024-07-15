import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { shapeTokens } from '@/themes/base/tokens/shape.stylex';
import { stateTokens } from '@/themes/base/tokens/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-switch.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-switch.scss

const vars = {
  // track
  trackShape: shapeTokens.corner$full,
  trackWidth: '52px',
  trackHeight: '32px',
  trackColor: colorRolesTokens.surfaceContainerHighest,
  // &:disabled
  trackColor$disabled: colorRolesTokens.surfaceContainerHighest,
  trackOpacity$disabled: stateTokens.containerOpacity$disabled,
  // &:focus
  trackColor$focus: colorRolesTokens.surfaceContainerHighest,
  // &:hover
  trackColor$hover: colorRolesTokens.surfaceContainerHighest,
  // &:pressed
  trackColor$pressed: colorRolesTokens.surfaceContainerHighest,

  // selectedTrack
  selectedTrackColor: colorRolesTokens.primary,
  // &:disabled
  selectedTrackColor$disabled: colorRolesTokens.onSurface,
  // &:focus
  selectedTrackColor$focus: colorRolesTokens.primary,
  // &:hover
  selectedTrackColor$hover: colorRolesTokens.primary,
  // &:pressed
  selectedTrackColor$pressed: colorRolesTokens.primary,

  // trackOutline
  trackOutlineWidth: '2px',
  trackOutlineColor: colorRolesTokens.outline,
  // &:disabled
  trackOutlineColor$disabled: colorRolesTokens.onSurface,
  // &:focus
  trackOutlineColor$focus: colorRolesTokens.outline,
  // &:hover
  trackOutlineColor$hover: colorRolesTokens.outline,
  // &:pressed
  trackOutlineColor$pressed: colorRolesTokens.outline,

  // handle
  handleShape: shapeTokens.corner$full,
  handleColor: colorRolesTokens.outline,
  handleWidth: '16px',
  handleHeight: '16px',
  handleWidth$withIcon: '24px',
  handleHeight$withIcon: '24px',
  // &:disabled
  handleColor$disabled: colorRolesTokens.onSurfaceVariant,
  handleOpacity$disabled: stateTokens.opacity$disabled,
  // &:hover
  handleColor$hover: colorRolesTokens.onSurfaceVariant,
  // &:focus
  handleColor$focus: colorRolesTokens.onSurfaceVariant,
  // &:pressed
  handleColor$pressed: colorRolesTokens.onSurfaceVariant,
  handleWidth$pressed: '28px',
  handleHeight$pressed: '28px',

  // selectedHandle
  selectedHandleColor: colorRolesTokens.onPrimary,
  selectedHandleWidth: '24px',
  selectedHandleHeight: '24px',
  // &:disabled
  selectedHandleColor$disabled: colorRolesTokens.surface,
  selectedHandleOpacity$disabled: '1',
  // &:focus
  selectedHandleColor$focus: colorRolesTokens.primaryContainer,
  // &:hover
  selectedHandleColor$hover: colorRolesTokens.primaryContainer,
  // &:pressed
  selectedHandleColor$pressed: colorRolesTokens.primaryContainer,

  // icon
  iconColor: colorRolesTokens.surfaceContainerHighest,
  iconSize: '16px',
  // &:disabled
  iconColor$disabled: colorRolesTokens.surface,
  iconOpacity$disabled: '0.76',
  // &:focus
  iconColor$focus: colorRolesTokens.surfaceContainerHighest,
  // &:hover
  iconColor$hover: colorRolesTokens.surfaceContainerHighest,
  // &:pressed
  iconColor$pressed: colorRolesTokens.surfaceContainerHighest,

  // selectedIcon
  selectedIconColor: colorRolesTokens.onPrimaryContainer,
  selectedIconSize: '16px',
  // &:disabled
  selectedIconColor$disabled: colorRolesTokens.onSurface,
  selectedIconOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  selectedIconColor$focus: colorRolesTokens.onPrimaryContainer,
  // &:hover
  selectedIconColor$hover: colorRolesTokens.onPrimaryContainer,
  // &:pressed
  selectedIconColor$pressed: colorRolesTokens.onPrimaryContainer,

  // stateLayer
  stateLayerShape: shapeTokens.corner$full,
  stateLayerSize: '40px',
  // &:hover
  stateLayerColor$hover: colorRolesTokens.onSurface,
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorRolesTokens.onSurface,
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // selectedStateLayer
  // &:hover
  selectedStateLayerColor$hover: colorRolesTokens.primary,
  selectedStateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  selectedStateLayerColor$pressed: colorRolesTokens.primary,
  selectedStateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,
};

export const switchTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const switchTheme = stylex.createTheme(switchTokens, vars);
