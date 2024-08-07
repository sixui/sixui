import stylex from '@stylexjs/stylex';

import { elevationTokens } from '../Elevation/Elevation.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

const vars = {
  // https://github.com/material-components/material-web/blob/main/tokens/_md-comp-assist-chip.scss#L93
  // https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filter-chip.scss#L135
  // https://github.com/material-components/material-web/blob/main/tokens/_md-comp-input-chip.scss#L123
  // https://github.com/material-components/material-web/blob/main/tokens/_md-comp-suggestion-chip.scss#L93
  leadingSpace: spacingTokens.padding$4,
  trailingSpace: spacingTokens.padding$4,
  iconLabelSpace: spacingTokens.padding$2,
  iconLeadingSpace: spacingTokens.padding$2,

  // https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-assist-chip.scss
  // https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filter-chip.scss
  // https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-input-chip.scss
  // https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-suggestion-chip.scss

  // container
  containerHeight: '32px',
  containerShape: shapeTokens.corner$sm,

  // flatContainer
  flatContainerColor: 'inherit',
  flatContainerElevation: elevationTokens.boxShadow$level0,
  // &:hover
  flatContainerElevation$hover: 'unset',
  // &:focus
  flatContainerElevation$focus: 'unset',
  // &:pressed
  flatContainerElevation$pressed: 'unset',
  // &:disabled
  flatContainerColor$disabled: 'inherit',
  flatContainerElevation$disabled: 'unset',
  flatContainerOpacity$disabled: stateTokens.containerOpacity$disabled,

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
  selectedFlatContainerOpacity$disabled: stateTokens.containerOpacity$disabled,

  // elevatedContainer
  elevatedContainerColor: colorSchemeTokens.surfaceContainerLow,
  elevatedContainerElevation: elevationTokens.boxShadow$level1,
  // &:disabled
  elevatedContainerColor$disabled: colorSchemeTokens.onSurface,
  elevatedContainerElevation$disabled: elevationTokens.boxShadow$level0,
  elevatedContainerOpacity$disabled: stateTokens.containerOpacity$disabled,
  // &:focus
  elevatedContainerElevation$focus: elevationTokens.boxShadow$level1,
  // &:hover
  elevatedContainerElevation$hover: elevationTokens.boxShadow$level2,
  // &:pressed
  elevatedContainerElevation$pressed: elevationTokens.boxShadow$level1,

  // selectedElevatedContainer
  selectedElevatedContainerColor: 'inherit',

  // outline
  outlineWidth: '1px',
  outlineColor: colorSchemeTokens.outline,
  // &:disabled
  outlineColor$disabled: colorSchemeTokens.onSurface,
  outlineOpacity$disabled: stateTokens.outlineOpacity$disabled,
  // &:focus
  outlineColor$focus: colorSchemeTokens.outline,
  // &:pressed
  outlineColor$pressed: colorSchemeTokens.outline,

  // selectedOutline
  selectedOutlineWidth: 'unset',

  // stateLayer
  // &:hover
  stateLayerColor$hover: 'inherit',
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: 'inherit',
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // selectedStateLayer
  // &:hover
  selectedStateLayerColor$hover: 'inherit',
  // &:pressed
  selectedStateLayerColor$pressed: 'inherit',

  // selectedStateLayer
  // &:hover
  selectedStateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  selectedStateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // labelText
  labelTextColor: colorSchemeTokens.onSurface,
  labelTextFont: typeScaleTokens.labelFont$lg,
  labelTextLineHeight: typeScaleTokens.labelLineHeight$lg,
  labelTextSize: typeScaleTokens.labelSize$lg,
  labelTextLetterSpacing: typeScaleTokens.labelLetterSpacing$lg,
  labelTextWeight: typeScaleTokens.labelWeight$lg,
  // &:disabled
  labelTextColor$disabled: colorSchemeTokens.onSurface,
  labelTextOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  labelTextColor$focus: colorSchemeTokens.onSurface,
  // &:hover
  labelTextColor$hover: colorSchemeTokens.onSurface,
  // &:pressed
  labelTextColor$pressed: colorSchemeTokens.onSurface,

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
  iconColor: colorSchemeTokens.onSurfaceVariant,
  iconColor$interactive: colorSchemeTokens.primary,
  // &:disabled
  iconColor$disabled: colorSchemeTokens.onSurface,
  iconOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  iconColor$focus: colorSchemeTokens.primary,
  // &:hover
  iconColor$hover: colorSchemeTokens.primary,
  // &:pressed
  iconColor$pressed: colorSchemeTokens.primary,

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
  trailingIconOpacity$disabled: stateTokens.opacity$disabled,

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
