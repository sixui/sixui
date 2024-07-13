import stylex from '@stylexjs/stylex';

import { componentVars as elevationVars } from '@/themes/base/Elevation/Elevation.stylex';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-primary.scss

const vars = {
  // container
  containerColor: 'inherit',
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
  loweredContainerColor: 'inherit',
  loweredContainerElevation: elevationVars.boxShadow$level1,
  // &hover
  loweredContainerElevation$hover: elevationVars.boxShadow$level2,
  // &:focus
  loweredContainerElevation$focus: elevationVars.boxShadow$level1,
  // &:pressed
  loweredContainerElevation$pressed: elevationVars.boxShadow$level1,

  // icon
  iconColor: 'inherit',
  iconSize$sm: '24px',
  iconSize$md: '24px',
  iconSize$lg: '36px',
  iconColor$disabled: colorRolesVars.onSurface,
  // &:hover
  iconColor$hover: 'inherit',
  // &:focus
  iconColor$focus: 'inherit',
  // &:pressed
  iconColor$pressed: 'inherit',
  // &:disabled
  iconOpacity$disabled: stateVars.opacity$disabled,

  // stateLayer
  // &:hover
  stateLayerColor$hover: 'inherit',
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: 'inherit',
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // label
  labelTextColor: 'inherit',
  labelTextFont: typescaleVars.labelFont$lg,
  labelTextLineHeight: typescaleVars.labelLineHeight$lg,
  labelTextSize: typescaleVars.labelSize$lg,
  labelTextLetterSpacing: typescaleVars.labelLetterSpacing$lg,
  labelTextWeight: typescaleVars.labelWeight$lg,
  // &:hover
  labelTextColor$hover: 'inherit',
  // &:focus
  labelTextColor$focus: 'inherit',
  // &:pressed
  labelTextColor$pressed: 'inherit',
  // &:disabled
  labelTextColor$disabled: colorRolesVars.onSurface,
  labelTextOpacity$disabled: stateVars.opacity$disabled,
};

export const fabTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const fabTheme = stylex.createTheme(fabTokens, vars);
