import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { stateTokens } from '~/themes/base/state.stylex';

const MIN_DENSITY = -2;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-switch.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-switch.scss

const vars = {
  // track
  trackShape: shapeTokens.corner$full,
  trackWidth: `calc(52px * ${scaleTokens.scale})`,
  trackHeight: `calc(32px * ${scaleTokens.scale} + ${DENSITY})`,
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
  trackOutlineWidth: outlineTokens.width$sm,
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
  handleWidth: `calc(16px * ${scaleTokens.scale})`,
  handleHeight: `calc(16px * ${scaleTokens.scale})`,
  handleWidth$withIcon: `calc(24px * ${scaleTokens.scale} + ${DENSITY})`,
  handleHeight$withIcon: `calc(24px * ${scaleTokens.scale} + ${DENSITY})`,
  // &:disabled
  handleColor$disabled: colorSchemeTokens.onSurfaceVariant,
  handleOpacity$disabled: stateTokens.opacity$disabled,
  // &:hover
  handleColor$hover: colorSchemeTokens.onSurfaceVariant,
  // &:focus
  handleColor$focus: colorSchemeTokens.onSurfaceVariant,
  // &:pressed
  handleColor$pressed: colorSchemeTokens.onSurfaceVariant,
  handleWidth$pressed: `calc(28px * ${scaleTokens.scale} + ${DENSITY})`,
  handleHeight$pressed: `calc(28px * ${scaleTokens.scale} + ${DENSITY})`,

  // selectedHandle
  selectedHandleColor: colorSchemeTokens.onPrimary,
  selectedHandleWidth: `calc(24px * ${scaleTokens.scale} + ${DENSITY})`,
  selectedHandleHeight: `calc(24px * ${scaleTokens.scale} + ${DENSITY})`,
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
  iconSize: `calc(16px * ${scaleTokens.scale})`,
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
  selectedIconSize: `calc(16px * ${scaleTokens.scale})`,
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
  stateLayerSize: densityTokens.minTargetSize,
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
