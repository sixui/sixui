import stylex from '@stylexjs/stylex';

import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-primary-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-primary-navigation-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-secondary-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-secondary-navigation-tab.scss

const vars = {
  // activeIndicator
  activeIndicatorShape: 'unset',
  activeIndicatorHeight: 'unset',
  activeIndicatorColor: colorRolesVars.primary,

  // container
  containerColor: colorRolesVars.surface,
  containerElevation: elevationTokens.boxShadow$level0,
  containerHeight: '48px',
  containerHeight$withIconAndLabelText: 'unset',
  containerShape: shapeVars.corner$none,
  // &:disabled
  containerElevation$disabled: elevationTokens.boxShadow$level0,
  containerColor$disabled: colorRolesVars.surface,
  containerOpacity$disabled: stateVars.opacity$disabled,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurface,
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.primary,
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // activeStateLayer
  // &:hover
  activeStateLayerColor$hover: 'unset',
  activeStateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  activeStateLayerColor$pressed: 'unset',
  activeStateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // icon
  iconColor: colorRolesVars.onSurfaceVariant,
  // &:disabled
  iconColor$disabled: colorRolesVars.onSurface,
  iconOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  iconColor$focus: colorRolesVars.onSurface,
  // &:hover
  iconColor$hover: colorRolesVars.onSurface,
  // &:pressed
  iconColor$pressed: colorRolesVars.onSurface,

  // actionIcon
  activeIconColor: 'inherit',
  // &:focus
  activeIconColor$focus: 'inherit',
  // &:hover
  activeIconColor$hover: 'inherit',
  // &:pressed
  activeIconColor$pressed: 'inherit',

  // labelText
  labelTextColor: colorRolesVars.onSurfaceVariant,
  labelTextFont: typescaleVars.titleFont$sm,
  labelTextLineHeight: typescaleVars.titleLineHeight$sm,
  labelTextSize: typescaleVars.titleSize$sm,
  labelTextLetterSpacing: typescaleVars.titleLetterSpacing$sm,
  labelTextWeight: typescaleVars.titleWeight$sm,
  // &:disabled
  labelTextColor$disabled: colorRolesVars.onSurface,
  labelTextOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  labelTextColor$focus: colorRolesVars.onSurface,
  // &:hover
  labelTextColor$hover: colorRolesVars.onSurface,
  // &:pressed
  labelTextColor$pressed: colorRolesVars.onSurface,

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
