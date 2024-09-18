import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { stateLayerTokens } from '../StateLayer/StateLayer.stylex';

const MIN_DENSITY = -1;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

const vars = {
  gap: `calc(${spacingTokens.padding$1} + ${DENSITY})`,

  // container
  containerShape: shapeTokens.corner$lg,
  containerShape$noLabel: shapeTokens.corner$full,

  // labelText
  labelTextFont: typeScaleTokens.labelFont$md,
  labelTextLineHeight: typeScaleTokens.labelLineHeight$md,
  labelTextSize: typeScaleTokens.labelSize$md,
  labelTextLetterSpacing: typeScaleTokens.labelLetterSpacing$md,
  labelTextWeight: typeScaleTokens.labelWeight$md,

  // activeLabelText
  activeLabelTextColor: colorSchemeTokens.onSurface,
  activeLabelTextWeight: typeScaleTokens.labelWeight$md$prominent,
  // &:hover
  activeLabelTextColor$hover: colorSchemeTokens.onSurface,
  // &:focus
  activeLabelTextColor$focus: colorSchemeTokens.onSurface,
  // &:pressed
  activeLabelTextColor$pressed: colorSchemeTokens.onSurface,

  // inactiveLabelText
  inactiveLabelTextColor: colorSchemeTokens.onSurfaceVariant,
  // &:hover
  inactiveLabelTextColor$hover: colorSchemeTokens.onSurface,
  // &:focus
  inactiveLabelTextColor$focus: colorSchemeTokens.onSurface,
  // &:pressed
  inactiveLabelTextColor$pressed: colorSchemeTokens.onSurface,

  // icon
  iconSize: `calc(18px * ${scaleTokens.scale})`,

  // activeIcon
  activeIconColor: colorSchemeTokens.onSecondaryContainer,
  // &:hover
  activeIconColor$hover: colorSchemeTokens.onSecondaryContainer,
  // &:focus
  activeIconColor$focus: colorSchemeTokens.onSecondaryContainer,
  // &:pressed
  activeIconColor$pressed: colorSchemeTokens.onSecondaryContainer,

  // inactiveIcon
  inactiveIconColor: colorSchemeTokens.onSurfaceVariant,
  // &:hover
  inactiveIconColor$hover: colorSchemeTokens.onSurface,
  // &:focus
  inactiveIconColor$focus: colorSchemeTokens.onSurface,
  // &:pressed
  inactiveIconColor$pressed: colorSchemeTokens.onSurface,

  // activeIndicator
  activeIndicatorColor: colorSchemeTokens.secondaryContainer,
  activeIndicatorWidth: `calc(56px * ${scaleTokens.scale})`,
  activeIndicatorHeight: `calc(32px * ${scaleTokens.scale} + ${DENSITY})`,
  activeIndicatorShape: shapeTokens.corner$full,
  // &:noLabel
  activeIndicatorHeight$noLabel: `calc(56px * ${scaleTokens.scale} + ${DENSITY})`,
  activeIndicatorShape$noLabel: shapeTokens.corner$full,

  // activeStateLayer
  activeStateLayerColor$hover: colorSchemeTokens.onSurface,
  activeStateLayerOpacity$hover: stateLayerTokens.opacity$hover,
  // &:pressed
  activeStateLayerColor$pressed: colorSchemeTokens.onSurface,
  activeStateLayerOpacity$pressed: stateLayerTokens.opacity$pressed,

  // inactiveStateLayer
  inactiveStateLayerColor$hover: colorSchemeTokens.onSurface,
  inactiveStateLayerOpacity$hover: stateLayerTokens.opacity$hover,
  // &:pressed
  inactiveStateLayerColor$pressed: colorSchemeTokens.onSurface,
  inactiveStateLayerOpacity$pressed: stateLayerTokens.opacity$pressed,
};

export const navigationRailDestinationTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const navigationRailDestinationTheme = stylex.createTheme(
  navigationRailDestinationTokens,
  vars,
);
