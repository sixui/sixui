import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IIconButtonStyleVarKey } from '@/components/atoms/IconButton';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { stateVars } from '../vars/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-icon-button.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-icon-button.scss

const vars: Partial<IStyleVars<IIconButtonStyleVarKey>> = {
  // container
  containerHeight: '40px',
  containerWidth: '40px',
  containerShape: shapeVars.corner$full,
  // &:disabled
  containerOpacity$disabled: stateVars.containerOpacity$disabled,

  // icon
  iconSize: '18px',
  // &:disabled
  iconColor$disabled: colorRolesVars.onSurface,
  iconOpacity$disabled: stateVars.opacity$disabled,

  // stateLayer
  // &:hover
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // selectedStateLayer
  // &:hover
  selectedStateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  selectedStateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IIconButtonStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
