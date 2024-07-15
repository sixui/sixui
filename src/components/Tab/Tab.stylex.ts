import stylex from '@stylexjs/stylex';

import { elevationTokens } from '@/components/Elevation/Elevation.stylex';
import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { stateTokens } from '@/themes/base/state.stylex';
import { typescaleTokens } from '@/themes/base/typo.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-primary-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-primary-navigation-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-secondary-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-secondary-navigation-tab.scss

const vars = {
  // activeIndicator
  activeIndicatorShape: 'unset',
  activeIndicatorHeight: 'unset',
  activeIndicatorColor: colorRolesTokens.primary,

  // container
  containerColor: colorRolesTokens.surface,
  containerElevation: elevationTokens.boxShadow$level0,
  containerHeight: '48px',
  containerHeight$withIconAndLabelText: 'unset',
  containerShape: shapeTokens.corner$none,
  // &:disabled
  containerElevation$disabled: elevationTokens.boxShadow$level0,
  containerColor$disabled: colorRolesTokens.surface,
  containerOpacity$disabled: stateTokens.opacity$disabled,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesTokens.onSurface,
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorRolesTokens.primary,
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // activeStateLayer
  // &:hover
  activeStateLayerColor$hover: 'unset',
  activeStateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  activeStateLayerColor$pressed: 'unset',
  activeStateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // icon
  iconColor: colorRolesTokens.onSurfaceVariant,
  // &:disabled
  iconColor$disabled: colorRolesTokens.onSurface,
  iconOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  iconColor$focus: colorRolesTokens.onSurface,
  // &:hover
  iconColor$hover: colorRolesTokens.onSurface,
  // &:pressed
  iconColor$pressed: colorRolesTokens.onSurface,

  // actionIcon
  activeIconColor: 'inherit',
  // &:focus
  activeIconColor$focus: 'inherit',
  // &:hover
  activeIconColor$hover: 'inherit',
  // &:pressed
  activeIconColor$pressed: 'inherit',

  // labelText
  labelTextColor: colorRolesTokens.onSurfaceVariant,
  labelTextFont: typescaleTokens.titleFont$sm,
  labelTextLineHeight: typescaleTokens.titleLineHeight$sm,
  labelTextSize: typescaleTokens.titleSize$sm,
  labelTextLetterSpacing: typescaleTokens.titleLetterSpacing$sm,
  labelTextWeight: typescaleTokens.titleWeight$sm,
  // &:disabled
  labelTextColor$disabled: colorRolesTokens.onSurface,
  labelTextOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  labelTextColor$focus: colorRolesTokens.onSurface,
  // &:hover
  labelTextColor$hover: colorRolesTokens.onSurface,
  // &:pressed
  labelTextColor$pressed: colorRolesTokens.onSurface,

  // activeLabelText
  activeLabelTextColor: 'inherit',
  // &:focus
  activeLabelTextColor$focus: 'inherit',
  // &:hover
  activeLabelTextColor$hover: 'inherit',
  // &:pressed
  activeLabelTextColor$pressed: 'inherit',

  // icon
  iconSize: '18px',
};

export const tabTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const tabTheme = stylex.createTheme(tabTokens, vars);
