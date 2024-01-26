import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ISwitchStyleVarKey } from '@/components/atoms/Switch';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { stateVars } from '../vars/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-switch.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-switch.scss
const vars: Partial<IStyleVars<ISwitchStyleVarKey>> = {
  // track
  trackShape: shapeVars.corner$full,
  trackWidth: '52px',
  trackHeight: '32px',
  trackColor: colorRolesVars.surfaceContainerHighest,
  // &:disabled
  trackColor$disabled: colorRolesVars.surfaceContainerHighest,
  trackOpacity$disabled: stateVars.containerOpacity$disabled,
  // &:focus
  trackColor$focus: colorRolesVars.surfaceContainerHighest,
  // &:hover
  trackColor$hover: colorRolesVars.surfaceContainerHighest,
  // &:pressed
  trackColor$pressed: colorRolesVars.surfaceContainerHighest,

  // selectedTrack
  selectedTrackColor: colorRolesVars.primary,
  // &:disabled
  selectedTrackColor$disabled: colorRolesVars.onSurface,
  // &:focus
  selectedTrackColor$focus: colorRolesVars.primary,
  // &:hover
  selectedTrackColor$hover: colorRolesVars.primary,
  // &:pressed
  selectedTrackColor$pressed: colorRolesVars.primary,

  // trackOutline
  trackOutlineWidth: '2px',
  trackOutlineColor: colorRolesVars.outline,
  // &:disabled
  trackOutlineColor$disabled: colorRolesVars.onSurface,
  // &:focus
  trackOutlineColor$focus: colorRolesVars.outline,
  // &:hover
  trackOutlineColor$hover: colorRolesVars.outline,
  // &:pressed
  trackOutlineColor$pressed: colorRolesVars.outline,

  // handle
  handleShape: shapeVars.corner$full,
  handleColor: colorRolesVars.outline,
  handleWidth: '16px',
  handleHeight: '16px',
  handleWidth$withIcon: '24px',
  handleHeight$withIcon: '24px',
  // &:disabled
  handleColor$disabled: colorRolesVars.onSurfaceVariant,
  handleOpacity$disabled: stateVars.opacity$disabled,
  // &:hover
  handleColor$hover: colorRolesVars.onSurfaceVariant,
  // &:focus
  handleColor$focus: colorRolesVars.onSurfaceVariant,
  // &:pressed
  handleColor$pressed: colorRolesVars.onSurfaceVariant,
  handleWidth$pressed: '28px',
  handleHeight$pressed: '28px',

  // selectedHandle
  selectedHandleColor: colorRolesVars.onPrimary,
  selectedHandleWidth: '24px',
  selectedHandleHeight: '24px',
  // &:disabled
  selectedHandleColor$disabled: colorRolesVars.surface,
  selectedHandleOpacity$disabled: '1',
  // &:focus
  selectedHandleColor$focus: colorRolesVars.primaryContainer,
  // &:hover
  selectedHandleColor$hover: colorRolesVars.primaryContainer,
  // &:pressed
  selectedHandleColor$pressed: colorRolesVars.primaryContainer,

  // icon
  iconColor: colorRolesVars.surfaceContainerHighest,
  iconSize: '16px',
  // &:disabled
  iconColor$disabled: colorRolesVars.surface,
  iconOpacity$disabled: '0.76',
  // &:focus
  iconColor$focus: colorRolesVars.surfaceContainerHighest,
  // &:hover
  iconColor$hover: colorRolesVars.surfaceContainerHighest,
  // &:pressed
  iconColor$pressed: colorRolesVars.surfaceContainerHighest,

  // selectedIcon
  selectedIconColor: colorRolesVars.onPrimaryContainer,
  selectedIconSize: '16px',
  // &:disabled
  selectedIconColor$disabled: colorRolesVars.onSurface,
  selectedIconOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  selectedIconColor$focus: colorRolesVars.onPrimaryContainer,
  // &:hover
  selectedIconColor$hover: colorRolesVars.onPrimaryContainer,
  // &:pressed
  selectedIconColor$pressed: colorRolesVars.onPrimaryContainer,

  // stateLayer
  stateLayerShape: shapeVars.corner$full,
  stateLayerSize: '40px',
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurface,
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onSurface,
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // selectedStateLayer
  // &:hover
  selectedStateLayerColor$hover: colorRolesVars.primary,
  selectedStateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  selectedStateLayerColor$pressed: colorRolesVars.primary,
  selectedStateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<ISwitchStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
