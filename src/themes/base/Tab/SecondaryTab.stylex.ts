import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ITabStyleVarKey } from '@/components/atoms/Tab';
import { componentVars as baseComponentVars } from './Tab.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-secondary-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-secondary-navigation-tab.scss

const vars: Partial<IStyleVars<ITabStyleVarKey>> = {
  // activeIndicator
  activeIndicatorHeight: '2px',
  activeIndicatorShape: '0',

  // activeLabelText
  activeLabelTextColor: colorRolesVars.onSurface,

  // activeIcon
  activeIconColor: baseComponentVars.iconColor,
  // &:focus
  activeIconColor$focus: baseComponentVars.iconColor$focus,
  // &:hover
  activeIconColor$hover: baseComponentVars.iconColor$hover,
  // &:pressed
  activeIconColor$pressed: baseComponentVars.iconColor$pressed,

  // activeLabelText
  // &:focus
  activeLabelTextColor$focus: baseComponentVars.labelTextColor$focus,
  // &:hover
  activeLabelTextColor$hover: baseComponentVars.labelTextColor$hover,
  // &:pressed
  activeLabelTextColor$pressed: baseComponentVars.labelTextColor$pressed,

  // activeStateLayer
  // &:hover
  activeStateLayerColor$hover: baseComponentVars.stateLayerColor$hover,
  activeStateLayerOpacity$hover: baseComponentVars.stateLayerOpacity$hover,
  // &:pressed
  activeStateLayerColor$pressed: baseComponentVars.stateLayerColor$pressed,
  activeStateLayerOpacity$pressed: baseComponentVars.stateLayerOpacity$pressed,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
