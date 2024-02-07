import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ITabStyleVarKey } from '@/components/atoms/Tab';
import { componentVars as baseComponentVars } from './Tab.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { stateVars } from '../vars/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-primary-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-primary-navigation-tab.scss

const vars: Partial<IStyleVars<ITabStyleVarKey>> = {
  // activeIndicator
  activeIndicatorHeight: '3px',
  activeIndicatorShape: '3px 3px 0 0',

  // activeStateLayer
  // &:hover
  activeStateLayerColor$hover: colorRolesVars.primary,
  activeStateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  activeStateLayerColor$pressed: colorRolesVars.primary,
  activeStateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // withIconAndLabelTextContainer
  withIconAndLabelTextContainerHeight: '64px',

  // activeIcon
  activeIconColor: colorRolesVars.primary,
  // &:focus
  activeIconColor$focus: colorRolesVars.primary,
  // &:hover
  activeIconColor$hover: colorRolesVars.primary,
  // &:pressed
  activeIconColor$pressed: colorRolesVars.primary,

  // activeLabelText
  activeLabelTextColor: colorRolesVars.primary,
  // &:focus
  activeLabelTextColor$focus: colorRolesVars.primary,
  // &:hover
  activeLabelTextColor$hover: colorRolesVars.primary,
  // &:pressed
  activeLabelTextColor$pressed: colorRolesVars.primary,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
