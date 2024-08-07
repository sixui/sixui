import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { stateTokens } from '~/themes/base/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-checkbox.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-checkbox.scss

const vars = {
  // container
  containerShape: `calc(2px * ${scaleTokens.scale})`,
  containerSize: `calc(18px * ${scaleTokens.scale})`,
  // &:disabled
  containerOpacity$disabled: stateTokens.opacity$disabled,

  // selectedContainer
  selectedContainerColor: colorSchemeTokens.primary,
  // &:disabled
  selectedContainerColor$disabled: colorSchemeTokens.onSurface,
  selectedContainerOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  selectedContainerColor$focus: colorSchemeTokens.primary,
  // &:hover
  selectedContainerColor$hover: colorSchemeTokens.primary,
  // &:error
  selectedContainerColor$error: colorSchemeTokens.error,
  // &:pressed
  selectedContainerColor$pressed: colorSchemeTokens.primary,
  // &:error:focus
  selectedContainerColor$error$focus: colorSchemeTokens.error,
  // &:error:hover
  selectedContainerColor$error$hover: colorSchemeTokens.error,
  // &:error:pressed
  selectedContainerColor$error$pressed: colorSchemeTokens.error,

  // outline
  outlineColor: colorSchemeTokens.onSurfaceVariant,
  outlineWidth: outlineTokens.width$sm,
  // &:focus
  outlineColor$focus: colorSchemeTokens.onSurface,
  outlineWidth$focus: outlineTokens.width$sm,
  // &:hover
  outlineColor$hover: colorSchemeTokens.onSurface,
  outlineWidth$hover: outlineTokens.width$sm,
  // &:pressed
  outlineColor$pressed: colorSchemeTokens.onSurface,
  outlineWidth$pressed: outlineTokens.width$sm,
  // &:disabled
  outlineColor$disabled: colorSchemeTokens.onSurface,
  outlineWidth$disabled: outlineTokens.width$sm,
  // &:error
  outlineColor$error: colorSchemeTokens.error,
  // &:error:focus
  outlineColor$error$focus: colorSchemeTokens.error,
  // &:error:hover
  outlineColor$error$hover: colorSchemeTokens.error,
  // &:error:pressed
  outlineColor$error$pressed: colorSchemeTokens.error,

  // icon
  iconSize: `calc(18px * ${scaleTokens.scale})`,

  // selectedIcon
  selectedIconColor: colorSchemeTokens.onPrimary,
  // &:disabled
  selectedIconColor$disabled: colorSchemeTokens.surface,
  // &:focus
  selectedIconColor$focus: colorSchemeTokens.onPrimary,
  // &:hover
  selectedIconColor$hover: colorSchemeTokens.onPrimary,
  // &:pressed
  selectedIconColor$pressed: colorSchemeTokens.onPrimary,
  // &:error
  selectedIconColor$error: colorSchemeTokens.onError,
  // &:error:focus
  selectedIconColor$error$focus: colorSchemeTokens.onError,
  // &:error:hover
  selectedIconColor$error$hover: colorSchemeTokens.onError,
  // &:error:pressed
  selectedIconColor$error$pressed: colorSchemeTokens.onError,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorSchemeTokens.onSurface,
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorSchemeTokens.primary,
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,
  // &:error:hover
  stateLayerColor$error$hover: colorSchemeTokens.error,
  stateLayerOpacity$error$hover: stateTokens.stateLayerOpacity$hover,
  // &:error:pressed
  stateLayerColor$error$pressed: colorSchemeTokens.error,
  stateLayerOpacity$error$pressed: stateTokens.stateLayerOpacity$pressed,

  // selectedStateLayer
  // &:hover
  selectedStateLayerColor$hover: colorSchemeTokens.primary,
  selectedStateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  selectedStateLayerColor$pressed: colorSchemeTokens.onSurface,
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
