import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ICardStyleVarKey } from '@/components/atoms/Card';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { stateVars } from '../vars/state.stylex';

const vars: Partial<IStyleVars<ICardStyleVarKey>> = {
  // container
  containerShape: shapeVars.corner$md,
  // &:disabled
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
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<ICardStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
