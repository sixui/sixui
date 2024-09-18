import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { elevationTokens } from '../Elevation/Elevation.stylex';

const MIN_DENSITY = -4;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-primary-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-primary-navigation-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-secondary-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-secondary-navigation-tab.scss

const vars = {
  // activeIndicator
  activeIndicatorShape: 'unset',
  activeIndicatorHeight: 'unset',
  activeIndicatorColor: colorSchemeTokens.primary,

  // container
  containerColor: colorSchemeTokens.surface,
  containerElevation: elevationTokens.boxShadow$level0,
  containerHeight: `calc(48px * ${scaleTokens.scale} + ${DENSITY})`,
  containerHeight$withIconAndLabelText: 'unset',
  containerShape: shapeTokens.corner$none,
  // &:disabled
  containerElevation$disabled: elevationTokens.boxShadow$level0,
  containerColor$disabled: colorSchemeTokens.surface,
  containerOpacity$disabled: stateTokens.opacity$disabled,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorSchemeTokens.onSurface,
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorSchemeTokens.primary,
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // activeStateLayer
  // &:hover
  activeStateLayerColor$hover: 'unset',
  activeStateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  activeStateLayerColor$pressed: 'unset',
  activeStateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // icon
  iconColor: colorSchemeTokens.onSurfaceVariant,
  // &:disabled
  iconColor$disabled: colorSchemeTokens.onSurface,
  iconOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  iconColor$focus: colorSchemeTokens.onSurface,
  // &:hover
  iconColor$hover: colorSchemeTokens.onSurface,
  // &:pressed
  iconColor$pressed: colorSchemeTokens.onSurface,

  // actionIcon
  activeIconColor: 'inherit',
  // &:focus
  activeIconColor$focus: 'inherit',
  // &:hover
  activeIconColor$hover: 'inherit',
  // &:pressed
  activeIconColor$pressed: 'inherit',

  // labelText
  labelTextColor: colorSchemeTokens.onSurfaceVariant,
  labelTextFont: typeScaleTokens.titleFont$sm,
  labelTextLineHeight: typeScaleTokens.titleLineHeight$sm,
  labelTextSize: typeScaleTokens.titleSize$sm,
  labelTextLetterSpacing: typeScaleTokens.titleLetterSpacing$sm,
  labelTextWeight: typeScaleTokens.titleWeight$sm,
  // &:disabled
  labelTextColor$disabled: colorSchemeTokens.onSurface,
  labelTextOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  labelTextColor$focus: colorSchemeTokens.onSurface,
  // &:hover
  labelTextColor$hover: colorSchemeTokens.onSurface,
  // &:pressed
  labelTextColor$pressed: colorSchemeTokens.onSurface,

  // activeLabelText
  activeLabelTextColor: 'inherit',
  // &:focus
  activeLabelTextColor$focus: 'inherit',
  // &:hover
  activeLabelTextColor$hover: 'inherit',
  // &:pressed
  activeLabelTextColor$pressed: 'inherit',

  // icon
  iconSize: `calc(18px * ${scaleTokens.scale})`,
};

export const tabTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const tabTheme = stylex.createTheme(tabTokens, vars);
