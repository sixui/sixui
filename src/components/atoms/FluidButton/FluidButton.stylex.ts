import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';

const vars = {
  // container
  containerColor: 'unset',
  containerShape: shapeVars.corner$full,
  // &:disabled
  containerColor$disabled: 'unset',
  containerOpacity$disabled: stateVars.containerOpacity$disabled,

  // labelText
  labelTextColor: colorRolesVars.primary,
  // &:disabled
  labelTextColor$disabled: colorRolesVars.onSurface,
  labelTextOpacity$disabled: stateVars.opacity$disabled,

  // stateLayer
  stateLayerSpace: '1em',
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurface,
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onSurface,
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // touchTarget
  touchTargetSpace: 'max(1em, 16px)',

  // focusRing
  focusRingOutwardOffset: '3px',
};

export const fluidButtonTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const fluidButtonTheme = stylex.createTheme(fluidButtonTokens, vars);
