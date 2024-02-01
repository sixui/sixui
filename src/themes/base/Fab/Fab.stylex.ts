import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IFabStyleVarKey } from '@/components/atoms/Fab';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { stateVars } from '../vars/state.stylex';
import { typescaleVars } from '../vars/typo.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-primary.scss
const vars: Partial<IStyleVars<IFabStyleVarKey>> = {
  // container
  containerWidth$sm: '40px',
  containerHeight$sm: '40px',
  containerWidth$md: '56px',
  containerHeight$md: '56px',
  containerWidth$lg: '96px',
  containerHeight$lg: '96px',
  containerShape$sm: shapeVars.corner$md,
  containerShape$md: shapeVars.corner$lg,
  containerShape$lg: shapeVars.corner$xl,
  containerElevation: elevationVars.boxShadow$level3,
  // &:disabled
  containerColor$disabled: colorRolesVars.onSurface,
  containerElevation$disabled: elevationVars.boxShadow$level0,
  containerOpacity$disabled: stateVars.containerOpacity$disabled,
  // &:hover
  containerElevation$hover: elevationVars.boxShadow$level4,
  // &:focus
  containerElevation$focus: elevationVars.boxShadow$level3,
  // &:pressed
  containerElevation$pressed: elevationVars.boxShadow$level3,

  // loweredContainer
  loweredContainerElevation: elevationVars.boxShadow$level1,
  // &hover
  loweredContainerElevation$hover: elevationVars.boxShadow$level2,
  // &:focus
  loweredContainerElevation$focus: elevationVars.boxShadow$level1,
  // &:pressed
  loweredContainerElevation$pressed: elevationVars.boxShadow$level1,

  // icon
  iconSize$sm: '24px',
  iconSize$md: '24px',
  iconSize$lg: '36px',
  iconColor$disabled: colorRolesVars.onSurface,
  // &:disabled
  iconOpacity$disabled: stateVars.opacity$disabled,

  // stateLayer
  // &:hover
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // label
  labelTextFont: typescaleVars.labelFont$lg,
  labelTextLineHeight: typescaleVars.labelLineHeight$lg,
  labelTextSize: typescaleVars.labelSize$lg,
  labelTextLetterSpacing: typescaleVars.labelLetterSpacing$lg,
  labelTextWeight: typescaleVars.labelWeight$lg,
  // &:disabled
  labelTextColor$disabled: colorRolesVars.onSurface,
  labelTextOpacity$disabled: stateVars.opacity$disabled,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IFabStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
