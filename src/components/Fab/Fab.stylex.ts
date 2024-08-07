import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { elevationTokens } from '../Elevation/Elevation.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-primary.scss

const vars = {
  // container
  containerColor: 'inherit',
  containerWidth$sm: `calc(40px * ${scaleTokens.scale})`,
  containerHeight$sm: `calc(40px * ${scaleTokens.scale})`,
  containerWidth$md: `calc(56px * ${scaleTokens.scale})`,
  containerHeight$md: `calc(56px * ${scaleTokens.scale})`,
  containerWidth$lg: `calc(96px * ${scaleTokens.scale})`,
  containerHeight$lg: `calc(96px * ${scaleTokens.scale})`,
  containerShape$sm: shapeTokens.corner$md,
  containerShape$md: shapeTokens.corner$lg,
  containerShape$lg: shapeTokens.corner$xl,
  containerElevation: elevationTokens.boxShadow$level3,
  // &:disabled
  containerColor$disabled: colorSchemeTokens.onSurface,
  containerElevation$disabled: elevationTokens.boxShadow$level0,
  containerOpacity$disabled: stateTokens.containerOpacity$disabled,
  // &:hover
  containerElevation$hover: elevationTokens.boxShadow$level4,
  // &:focus
  containerElevation$focus: elevationTokens.boxShadow$level3,
  // &:pressed
  containerElevation$pressed: elevationTokens.boxShadow$level3,

  // loweredContainer
  loweredContainerColor: 'inherit',
  loweredContainerElevation: elevationTokens.boxShadow$level1,
  // &hover
  loweredContainerElevation$hover: elevationTokens.boxShadow$level2,
  // &:focus
  loweredContainerElevation$focus: elevationTokens.boxShadow$level1,
  // &:pressed
  loweredContainerElevation$pressed: elevationTokens.boxShadow$level1,

  // icon
  iconColor: 'inherit',
  iconSize$sm: `calc(24px * ${scaleTokens.scale})`,
  iconSize$md: `calc(24px * ${scaleTokens.scale})`,
  iconSize$lg: `calc(36px * ${scaleTokens.scale})`,
  iconColor$disabled: colorSchemeTokens.onSurface,
  // &:hover
  iconColor$hover: 'inherit',
  // &:focus
  iconColor$focus: 'inherit',
  // &:pressed
  iconColor$pressed: 'inherit',
  // &:disabled
  iconOpacity$disabled: stateTokens.opacity$disabled,

  // stateLayer
  // &:hover
  stateLayerColor$hover: 'inherit',
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: 'inherit',
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // label
  labelTextColor: 'inherit',
  labelTextFont: typeScaleTokens.labelFont$lg,
  labelTextLineHeight: typeScaleTokens.labelLineHeight$lg,
  labelTextSize: typeScaleTokens.labelSize$lg,
  labelTextLetterSpacing: typeScaleTokens.labelLetterSpacing$lg,
  labelTextWeight: typeScaleTokens.labelWeight$lg,
  // &:hover
  labelTextColor$hover: 'inherit',
  // &:focus
  labelTextColor$focus: 'inherit',
  // &:pressed
  labelTextColor$pressed: 'inherit',
  // &:disabled
  labelTextColor$disabled: colorSchemeTokens.onSurface,
  labelTextOpacity$disabled: stateTokens.opacity$disabled,
};

export const fabTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const fabTheme = stylex.createTheme(fabTokens, vars);
