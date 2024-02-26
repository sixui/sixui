import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ITextFieldStyleVarKey } from '@/components/atoms/TextField';
import { componentVars as baseComponentVars } from './TextField.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { stateVars } from '../vars/state.stylex';
import { shapeVars } from '../vars/shape.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-text-field.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-text-field.scss
// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-field.scss

const vars: Partial<IStyleVars<ITextFieldStyleVarKey>> = {
  topSpace$withLabel: '8px',
  bottomSpace$withLabel: '8px',

  // container
  containerColor: colorRolesVars.surfaceContainerHighest,
  containerShape: shapeVars.cornerTop$xs,
  // &:disabled
  containerColor$disabled: colorRolesVars.onSurface,
  containerOpacity$disabled: '0.04',

  // label
  // &:hover
  labelTextColor$hover: colorRolesVars.onSurface,

  // activeIndicator
  activeIndicatorColor: colorRolesVars.onSurfaceVariant,
  activeIndicatorHeight: '1px',
  // &:focus
  activeIndicatorColor$focus: colorRolesVars.primary,
  activeIndicatorHeight$focus: '3px',
  // &:hover
  activeIndicatorColor$hover: colorRolesVars.onSurface,
  activeIndicatorHeight$hover: '1px',
  // &:error
  activeIndicatorColor$error: colorRolesVars.error,
  // &:error:focus
  activeIndicatorColor$error$focus: colorRolesVars.error,
  // &:error:hover
  activeIndicatorColor$error$hover: colorRolesVars.onErrorContainer,
  // &:disabled
  activeIndicatorColor$disabled: colorRolesVars.onSurface,
  activeIndicatorOpacity$disabled: stateVars.opacity$disabled,
  activeIndicatorHeight$disabled: '1px',

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurface,
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:error:hover
  stateLayerColor$error$hover: colorRolesVars.onSurface,
  stateLayerOpacity$error$hover: stateVars.stateLayerOpacity$hover,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
