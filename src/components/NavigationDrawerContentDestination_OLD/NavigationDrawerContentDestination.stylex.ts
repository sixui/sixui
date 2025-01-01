import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

const vars = {
  // activeIndicator
  activeIndicatorColor: colorSchemeTokens.secondaryContainer,
  activeIndicatorShape: shapeTokens.corner$full,

  // labelText
  labelTextFont: typeScaleTokens.labelFont$lg,
  labelTextLineHeight: typeScaleTokens.labelLineHeight$lg,
  labelTextSize: typeScaleTokens.labelSize$lg,
  labelTextLetterSpacing: typeScaleTokens.labelLetterSpacing$lg,
  labelTextWeight: typeScaleTokens.labelWeight$lg,

  // inactiveLabelText
  inactiveLabelTextColor: colorSchemeTokens.onSurfaceVariant,
  // &:hover
  inactiveLabelTextColor$hover: colorSchemeTokens.onSurface,
  // &:focus
  inactiveLabelTextColor$focus: colorSchemeTokens.onSurface,
  // &:pressed
  inactiveLabelTextColor$pressed: colorSchemeTokens.onSurface,

  // activeLabelText
  activeLabelTextColor: colorSchemeTokens.onSecondaryContainer,
  activeLabelTextWeight: typeScaleTokens.labelWeight$lg$prominent,
  // &:hover
  activeLabelTextColor$hover: colorSchemeTokens.onSecondaryContainer,
  // &:focus
  activeLabelTextColor$focus: colorSchemeTokens.onSecondaryContainer,
  // &:pressed
  activeLabelTextColor$pressed: colorSchemeTokens.onSecondaryContainer,

  // icon
  iconSize: `calc(24px * ${scaleTokens.scale})`,

  // inactiveIcon
  inactiveIconColor: colorSchemeTokens.onSurfaceVariant,
  // &:hover
  inactiveIconColor$hover: colorSchemeTokens.onSurface,
  // &:focus
  inactiveIconColor$focus: colorSchemeTokens.onSurface,
  // &:pressed
  inactiveIconColor$pressed: colorSchemeTokens.onSurface,

  // activeIcon
  activeIconColor: colorSchemeTokens.onSecondaryContainer,
  // &:hover
  activeIconColor$hover: colorSchemeTokens.onSecondaryContainer,
  // &:focus
  activeIconColor$focus: colorSchemeTokens.onSecondaryContainer,
  // &:pressed
  activeIconColor$pressed: colorSchemeTokens.onSecondaryContainer,

  // stateLayer
  // &:hover
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // inactiveStateLayer
  // &:hover
  inactiveStateLayerColor$hover: colorSchemeTokens.onSurface,
  // &:pressed
  inactiveStateLayerColor$pressed: colorSchemeTokens.onSecondaryContainer,

  // activeStateLayer
  // &:hover
  activeStateLayerColor$hover: colorSchemeTokens.onSecondaryContainer,
  // &:pressed
  activeStateLayerColor$pressed: colorSchemeTokens.onSecondaryContainer,

  // largeBadgeLabelText
  largeBadgeLabelTextColor: colorSchemeTokens.onSurfaceVariant,
  largeBadgeLabelTextFont: typeScaleTokens.labelFont$lg,
  largeBadgeLabelTextLineHeight: typeScaleTokens.labelLineHeight$lg,
  largeBadgeLabelTextSize: typeScaleTokens.labelSize$lg,
  largeBadgeLabelTextLetterSpacing: typeScaleTokens.labelLetterSpacing$lg,
  largeBadgeLabelTextWeight: typeScaleTokens.labelWeight$lg,
};

export const navigationDrawerContentDestinationTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const navigationDrawerContentDestinationTheme = stylex.createTheme(
  navigationDrawerContentDestinationTokens,
  vars,
);
