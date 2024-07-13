import stylex from '@stylexjs/stylex';

import { componentVars as elevationVars } from '@/themes/base/Elevation/Elevation.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

const vars = {
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
  flatContainerColor: 'inherit',
  flatContainerElevation: elevationVars.boxShadow$level0,
  // &:hover
  flatContainerElevation$hover: 'unset',
  // &:focus
  flatContainerElevation$focus: 'unset',
  // &:pressed
  flatContainerElevation$pressed: 'unset',
  // &:disabled
  flatContainerColor$disabled: 'inherit',
  flatContainerElevation$disabled: 'unset',
  flatContainerOpacity$disabled: stateVars.containerOpacity$disabled,

  // selectedFlatContainer
  selectedFlatContainerColor: 'inherit',
  selectedFlatContainerElevation: 'unset',
  // &:hover
  selectedFlatContainerElevation$hover: 'unset',
  // &:focus
  selectedFlatContainerElevation$focus: 'unset',
  // &:pressed
  selectedFlatContainerElevation$pressed: 'unset',
  // &:disabled
  selectedFlatContainerColor$disabled: 'inherit',
  selectedFlatContainerElevation$disabled: 'unset',
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

  // selectedElevatedContainer
  selectedElevatedContainerColor: 'inherit',

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

  // selectedOutline
  selectedOutlineWidth: 'unset',

  // stateLayer
  // &:hover
  stateLayerColor$hover: 'inherit',
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: 'inherit',
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // selectedStateLayer
  // &:hover
  selectedStateLayerColor$hover: 'inherit',
  // &:pressed
  selectedStateLayerColor$pressed: 'inherit',

  // selectedStateLayer
  // &:hover
  selectedStateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  selectedStateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // labelText
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

  // selectedLabelText
  selectedLabelTextColor: 'inherit',
  // &:hover
  selectedLabelTextColor$hover: 'inherit',
  // &:focus
  selectedLabelTextColor$focus: 'inherit',
  // &:pressed
  selectedLabelTextColor$pressed: 'inherit',

  // icon
  iconSize: '18px',
  iconColor: colorRolesVars.onSurfaceVariant,
  iconColor$interactive: colorRolesVars.primary,
  // &:disabled
  iconColor$disabled: colorRolesVars.onSurface,
  iconOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  iconColor$focus: colorRolesVars.primary,
  // &:hover
  iconColor$hover: colorRolesVars.primary,
  // &:pressed
  iconColor$pressed: colorRolesVars.primary,

  // selectedIcon
  selectedIconColor: 'inherit',
  // &:focus
  selectedIconColor$focus: 'inherit',
  // &:hover
  selectedIconColor$hover: 'inherit',
  // &:pressed
  selectedIconColor$pressed: 'inherit',

  // trailingIcon
  trailingIconColor: 'inherit',
  trailingIconTrailingSpace: 'unset',
  // &:focus
  trailingIconColor$focus: 'inherit',
  // &:hover
  trailingIconColor$hover: 'inherit',
  // &:pressed
  trailingIconColor$pressed: 'inherit',
  // &:disabled
  trailingIconColor$disabled: 'inherit',
  trailingIconOpacity$disabled: stateVars.opacity$disabled,

  // selectedTrailingIcon
  selectedTrailingIconColor: 'inherit',
  // &:focus
  selectedTrailingIconColor$focus: 'inherit',
  // &:hover
  selectedTrailingIconColor$hover: 'inherit',
  // &:pressed
  selectedTrailingIconColor$pressed: 'inherit',

  // avatar
  avatarShape: 'unset',
  avatarSize: 'unset',
};

export const chipTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const chipTheme = stylex.createTheme(chipTokens, vars);
