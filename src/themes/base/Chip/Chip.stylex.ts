import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IChipStyleVarKey } from '@/components/atoms/Chip';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { typescaleVars } from '../vars/typo.stylex';
import { stateVars } from '../vars/state.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

const vars: Partial<IStyleVars<IChipStyleVarKey>> = {
  // https://github.com/material-components/material-web/blob/main/tokens/_md-comp-assist-chip.scss#L93
  // https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filter-chip.scss#L135
  // https://github.com/material-components/material-web/blob/main/tokens/_md-comp-input-chip.scss#L123
  // https://github.com/material-components/material-web/blob/main/tokens/_md-comp-suggestion-chip.scss#L93
  leadingSpace: '16px',
  trailingSpace: '16px',
  iconLabelSpace: '8px',
  iconLeadingSpace: '8px',

  // https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-assist-chip.scss
  // https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filter-chip.scss
  // https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-input-chip.scss
  // https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-suggestion-chip.scss

  // container
  containerHeight: '32px',
  containerShape: shapeVars.corner$sm,

  // flatContainer
  flatContainerElevation: elevationVars.boxShadow$level0,
  // &:disabled
  flatContainerOpacity$disabled: stateVars.containerOpacity$disabled,

  // selectedFlatContainer
  // &:disabled
  selectedFlatContainerOpacity$disabled: stateVars.containerOpacity$disabled,

  // elevatedContainer
  elevatedContainerColor: colorRolesVars.surfaceContainerLow,
  elevatedContainerElevation: elevationVars.boxShadow$level1,
  // &:disabled
  elevatedContainerColor$disabled: colorRolesVars.onSurface,
  elevatedContainerElevation$disabled: elevationVars.boxShadow$level0,
  elevatedContainerOpacity$disabled: stateVars.containerOpacity$disabled,
  // &:focus
  elevatedContainerElevation$focus: elevationVars.boxShadow$level1,
  // &:hover
  elevatedContainerElevation$hover: elevationVars.boxShadow$level2,
  // &:pressed
  elevatedContainerElevation$pressed: elevationVars.boxShadow$level1,

  // outline
  outlineWidth: '1px',
  outlineColor: colorRolesVars.outline,
  // &:disabled
  outlineColor$disabled: colorRolesVars.onSurface,
  outlineOpacity$disabled: stateVars.outlineOpacity$disabled,
  // &:focus
  outlineColor$focus: colorRolesVars.outline,
  // &:pressed
  outlineColor$pressed: colorRolesVars.outline,

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

  // label
  labelTextColor: colorRolesVars.onSurface,
  labelTextFont: typescaleVars.labelFont$lg,
  labelTextLineHeight: typescaleVars.labelLineHeight$lg,
  labelTextSize: typescaleVars.labelSize$lg,
  labelTextLetterSpacing: typescaleVars.labelLetterSpacing$lg,
  labelTextWeight: typescaleVars.labelWeight$lg,
  // &:disabled
  labelTextColor$disabled: colorRolesVars.onSurface,
  labelTextOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  labelTextColor$focus: colorRolesVars.onSurface,
  // &:hover
  labelTextColor$hover: colorRolesVars.onSurface,
  // &:pressed
  labelTextColor$pressed: colorRolesVars.onSurface,

  // icon
  iconSize: '18px',
  iconColor: colorRolesVars.primary,
  // &:disabled
  iconColor$disabled: colorRolesVars.onSurface,
  iconOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  iconColor$focus: colorRolesVars.primary,
  // &:hover
  iconColor$hover: colorRolesVars.primary,
  // &:pressed
  iconColor$pressed: colorRolesVars.primary,

  // trailingIcon
  // &:disabled
  trailingIconOpacity$disabled: stateVars.opacity$disabled,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IChipStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
