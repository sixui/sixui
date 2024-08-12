import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { elevationTokens } from '../Elevation/Elevation.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

const vars = {
  // container
  containerColor: colorSchemeTokens.surface,
  containerElevation: elevationTokens.boxShadow$level0,
  containerWidth: `calc(360px * ${scaleTokens.scale})`,
  containerHeight: '100%',
  containerShape: shapeTokens.cornerEnd$lg,

  // bottomContainer
  bottomContainerShape: shapeTokens.cornerTop$lg,

  // activeStateLayer
  // &:hover
  activeStateLayerColor$hover: colorSchemeTokens.onSecondaryContainer,
  // &:pressed
  activeStateLayerColor$pressed: colorSchemeTokens.onSecondaryContainer,

  // inactiveStateLayer
  // &:hover
  inactiveStateLayerColor$hover: colorSchemeTokens.onSurface,
  // &:pressed
  inactiveStateLayerColor$pressed: colorSchemeTokens.onSecondaryContainer,

  // stateLayer
  // &:hover
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // labelText
  labelTextFont: typeScaleTokens.labelFont$lg,
  labelTextLineHeight: typeScaleTokens.labelLineHeight$lg,
  labelTextSize: typeScaleTokens.labelSize$lg,
  labelTextLetterSpacing: typeScaleTokens.labelLetterSpacing$lg,
  labelTextWeight: typeScaleTokens.labelWeight$lg,

  // activeLabelText
  activeLabelTextColor: colorSchemeTokens.onSecondaryContainer,
  activeLabelTextWeight: typeScaleTokens.labelWeight$lg$prominent,
  // &:hover
  activeLabelTextColor$hover: colorSchemeTokens.onSecondaryContainer,
  // &:focus
  activeLabelTextColor$focus: colorSchemeTokens.onSecondaryContainer,
  // &:pressed
  activeLabelTextColor$pressed: colorSchemeTokens.onSecondaryContainer,

  // inactiveLabelText
  inactiveLabelTextColor: colorSchemeTokens.onSurfaceVariant,
  // &:hover
  inactiveLabelTextColor$hover: colorSchemeTokens.onSurface,
  // &:focus
  inactiveLabelTextColor$focus: colorSchemeTokens.onSurface,
  // &:pressed
  inactiveLabelTextColor$pressed: colorSchemeTokens.onSurface,

  // icon
  iconSize: `calc(24px * ${scaleTokens.scale})`,

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

  // headline
  headlineColor: colorSchemeTokens.onSurfaceVariant,
  headlineTextFont: typeScaleTokens.titleFont$sm,
  headlineTextLineHeight: typeScaleTokens.titleLineHeight$sm,
  headlineTextSize: typeScaleTokens.titleSize$sm,
  headlineTextLetterSpacing: typeScaleTokens.titleLetterSpacing$sm,
  headlineTextWeight: typeScaleTokens.titleWeight$sm,

  // divider
  dividerColor: colorSchemeTokens.outline,

  // activeIndicator
  activeIndicatorColor: colorSchemeTokens.secondaryContainer,
  activeIndicatorHeight: `calc(56px * ${scaleTokens.scale})`,
  activeIndicatorShape: shapeTokens.corner$full,
  activeIndicatorWidth: `calc(336px * ${scaleTokens.scale})`,

  // largeBadgeLabel
  largeBadgeLabelColor: colorSchemeTokens.onSurfaceVariant,
  largeBadgeLabelFont: typeScaleTokens.labelFont$lg,
  largeBadgeLabelLineHeight: typeScaleTokens.labelLineHeight$lg,
  largeBadgeLabelSize: typeScaleTokens.labelSize$lg,
  largeBadgeLabelLetterSpacing: typeScaleTokens.labelLetterSpacing$lg,
  largeBadgeLabelWeight: typeScaleTokens.labelWeight$lg,
};

export const navigationDrawerTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const navigationDrawerTheme = stylex.createTheme(
  navigationDrawerTokens,
  vars,
);
