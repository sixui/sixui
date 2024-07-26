import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { stateTokens } from '~/themes/base/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-switch.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-switch.scss

const vars = {
  // track
  trackShape: shapeTokens.corner$full,
  trackWidth: '52px',
  trackHeight: '32px',
  trackColor: colorSchemeTokens.surfaceContainerHighest,
  // &:disabled
  trackColor$disabled: colorSchemeTokens.surfaceContainerHighest,
  trackOpacity$disabled: stateTokens.containerOpacity$disabled,
  // &:focus
  trackColor$focus: colorSchemeTokens.surfaceContainerHighest,
  // &:hover
  trackColor$hover: colorSchemeTokens.surfaceContainerHighest,
  // &:pressed
  trackColor$pressed: colorSchemeTokens.surfaceContainerHighest,

  // selectedTrack
  selectedTrackColor: colorSchemeTokens.primary,
  // &:disabled
  selectedTrackColor$disabled: colorSchemeTokens.onSurface,
  // &:focus
  selectedTrackColor$focus: colorSchemeTokens.primary,
  // &:hover
  selectedTrackColor$hover: colorSchemeTokens.primary,
  // &:pressed
  selectedTrackColor$pressed: colorSchemeTokens.primary,

  // trackOutline
  trackOutlineWidth: '2px',
  trackOutlineColor: colorSchemeTokens.outline,
  // &:disabled
  trackOutlineColor$disabled: colorSchemeTokens.onSurface,
  // &:focus
  trackOutlineColor$focus: colorSchemeTokens.outline,
  // &:hover
  trackOutlineColor$hover: colorSchemeTokens.outline,
  // &:pressed
  trackOutlineColor$pressed: colorSchemeTokens.outline,

  // handle
  handleShape: shapeTokens.corner$full,
  handleColor: colorSchemeTokens.outline,
  handleWidth: '16px',
  handleHeight: '16px',
  handleWidth$withIcon: '24px',
  handleHeight$withIcon: '24px',
  // &:disabled
  handleColor$disabled: colorSchemeTokens.onSurfaceVariant,
  handleOpacity$disabled: stateTokens.opacity$disabled,
  // &:hover
  handleColor$hover: colorSchemeTokens.onSurfaceVariant,
  // &:focus
  handleColor$focus: colorSchemeTokens.onSurfaceVariant,
  // &:pressed
  handleColor$pressed: colorSchemeTokens.onSurfaceVariant,
  handleWidth$pressed: '28px',
  handleHeight$pressed: '28px',

  // selectedHandle
  selectedHandleColor: colorSchemeTokens.onPrimary,
  selectedHandleWidth: '24px',
  selectedHandleHeight: '24px',
  // &:disabled
  selectedHandleColor$disabled: colorSchemeTokens.surface,
  selectedHandleOpacity$disabled: '1',
  // &:focus
  selectedHandleColor$focus: colorSchemeTokens.primaryContainer,
  // &:hover
  selectedHandleColor$hover: colorSchemeTokens.primaryContainer,
  // &:pressed
  selectedHandleColor$pressed: colorSchemeTokens.primaryContainer,

  // icon
  iconColor: colorSchemeTokens.surfaceContainerHighest,
  iconSize: '16px',
  // &:disabled
  iconColor$disabled: colorSchemeTokens.surface,
  iconOpacity$disabled: '0.76',
  // &:focus
  iconColor$focus: colorSchemeTokens.surfaceContainerHighest,
  // &:hover
  iconColor$hover: colorSchemeTokens.surfaceContainerHighest,
  // &:pressed
  iconColor$pressed: colorSchemeTokens.surfaceContainerHighest,

  // selectedIcon
  selectedIconColor: colorSchemeTokens.onPrimaryContainer,
  selectedIconSize: '16px',
  // &:disabled
  selectedIconColor$disabled: colorSchemeTokens.onSurface,
  selectedIconOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  selectedIconColor$focus: colorSchemeTokens.onPrimaryContainer,
  // &:hover
  selectedIconColor$hover: colorSchemeTokens.onPrimaryContainer,
  // &:pressed
  selectedIconColor$pressed: colorSchemeTokens.onPrimaryContainer,

  // stateLayer
  stateLayerShape: shapeTokens.corner$full,
  stateLayerSize: '40px',
  // &:hover
  stateLayerColor$hover: colorSchemeTokens.onSurface,
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorSchemeTokens.onSurface,
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // selectedStateLayer
  // &:hover
  selectedStateLayerColor$hover: colorSchemeTokens.primary,
  selectedStateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  selectedStateLayerColor$pressed: colorSchemeTokens.primary,
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
