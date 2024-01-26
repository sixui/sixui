import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IItemStyleVarKey } from '@/components/atoms/Item';
import { componentVars as baseComponentVars } from '../Item/Item.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { stateVars } from '../vars/state.stylex';
import { typescaleVars } from '../vars/typo.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-list-item.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-list.scss
const vars: Partial<IStyleVars<IItemStyleVarKey>> = {
  leadingSpace: '16px',
  topSpace: '12px',
  bottomSpace: '12px',
  // &:disabled
  opacity$disabled: '0.3',

  // container
  containerColor: colorRolesVars.surface,
  containerElevation: elevationVars.boxShadow$level0,
  containerShape: shapeVars.corner$none,
  containerHeight$oneLine: '56px',
  containerHeight$twoLine: '72px',
  containerHeight$threeLine: '88px',

  // labelText
  labelTextColor: colorRolesVars.onSurface,
  // &:disabled
  labelTextColor$disabled: colorRolesVars.onSurface,
  labelTextOpacity$disabled: '0.3',
  // &:focus
  labelTextColor$focus: colorRolesVars.onSurface,
  // &:hover
  labelTextColor$hover: colorRolesVars.onSurface,
  // &:pressed
  labelTextColor$pressed: colorRolesVars.onSurface,

  // leadingIcon
  leadingIconColor: colorRolesVars.onSurfaceVariant,
  leadingIconSize: '24px',
  // &:disabled
  leadingIconColor$disabled: colorRolesVars.onSurface,
  leadingIconOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  leadingIconIconColor$focus: colorRolesVars.onSurfaceVariant,
  // &:hover
  leadingIconIconColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  leadingIconIconColor$pressed: colorRolesVars.onSurfaceVariant,

  // trailingIcon
  trailingIconColor: colorRolesVars.onSurfaceVariant,
  trailingIconSize: '24px',
  trailingSpace: '16px',
  // &:disabled
  trailingIconColor$disabled: colorRolesVars.onSurface,
  trailingIconOpacity$disabled: stateVars.opacity$disabled,
  // &:hover
  trailingIconIconColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  trailingIconIconColor$pressed: colorRolesVars.onSurfaceVariant,

  // selectedTrailingIcon
  selectedTrailingIconColor: colorRolesVars.primary,

  // unselectedTrailingIcon
  unselectedTrailingIconColor: colorRolesVars.onSurface,

  // stateLayer
  // &:disabled
  stateLayerColor$disabled: colorRolesVars.onSurface,
  stateLayerOpacity$disabled: stateVars.opacity$disabled,
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurface,
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onSurface,
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // leadingVideo
  leadingVideoWidth: '100px',
  leadingVideoHeight$large: '69px',
  leadingVideoHeight$small: '56px',
  leadingVideoShape: shapeVars.corner$none,

  // leadingAvatar
  leadingAvatarLabelColor: colorRolesVars.onPrimaryContainer,
  leadingAvatarLabelFont: typescaleVars.titleFont$md,
  leadingAvatarLabelLineHeight: typescaleVars.titleLineHeight$md,
  leadingAvatarLabelSize: typescaleVars.titleSize$md,
  leadingAvatarLabelTracking: typescaleVars.titleTracking$md,
  leadingAvatarLabelWeight: typescaleVars.titleWeight$md,
  leadingAvatarColor: colorRolesVars.primaryContainer,
  leadingAvatarShape: shapeVars.corner$full,
  leadingAvatarSize: '40px',

  // leadingImage
  leadingImageHeight: '56px',
  leadingImageShape: shapeVars.corner$none,
  leadingImageWidth: '56px',
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IItemStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(baseComponentVars, vars);
