import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ITabStyleVarKey } from '@/components/atoms/Tab';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { stateVars } from '../vars/state.stylex';
import { typescaleVars } from '../vars/typo.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-primary-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-primary-navigation-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-secondary-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-secondary-navigation-tab.scss

const vars: Partial<IStyleVars<ITabStyleVarKey>> = {
  // activeIndicator
  activeIndicatorColor: colorRolesVars.primary,

  // containerColor
  containerColor: colorRolesVars.surface,
  containerElevation: elevationVars.boxShadow$level0,
  containerHeight: '48px',
  containerShape: shapeVars.corner$none,
  // &:disabled
  containerElevation$disabled: elevationVars.boxShadow$level0,
  containerColor$disabled: colorRolesVars.surface,
  containerOpacity$disabled: stateVars.opacity$disabled,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurface,
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.primary,
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

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

  // icon
  iconSize: '18px',
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<ITabStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
