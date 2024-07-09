import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IFluidButtonStyleVarKey } from '@/components/atoms/FluidButton';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { stateVars } from '../vars/state.stylex';

const vars: IStyleVars<IFluidButtonStyleVarKey> = {
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

export const componentVars = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
