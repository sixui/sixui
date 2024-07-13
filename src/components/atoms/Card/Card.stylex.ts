import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';

const vars = {
  // container
  containerColor: 'inherit',
  containerElevation: 'unset',
  containerShape: shapeVars.corner$md,
  // &:hover
  containerElevation$hover: 'unset',
  // &:focus
  containerElevation$focus: 'unset',
  // &:pressed
  containerElevation$pressed: 'unset',
  // &:dragged
  containerElevation$dragged: 'unset',
  // &:disabled
  containerElevation$disabled: 'unset',
  containerColor$disabled: 'inherit',
  containerOpacity$disabled: '0.38',

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurface,
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onSurface,
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,
  // &:dragged
  stateLayerColor$dragged: colorRolesVars.onSurface,
  stateLayerOpacity$dragged: stateVars.stateLayerOpacity$dragged,

  // outline
  outlineColor: 'unset',
  outlineWidth: 'unset',
  // &:hover
  outlineColor$hover: 'unset',
  // &:focus
  outlineColor$focus: 'unset',
  // &:pressed
  outlineColor$pressed: 'unset',
  // &:dragged
  outlineColor$dragged: 'unset',
  // &:disabled
  outlineColor$disabled: 'unset',
  outlineOpacity$disabled: 'unset',
};

export const cardTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const cardTheme = stylex.createTheme(cardTokens, vars);
