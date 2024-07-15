import stylex from '@stylexjs/stylex';

import { elevationTokens } from '@/components/Elevation/Elevation.stylex';
import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { stateTokens } from '@/themes/base/state.stylex';
import { typescaleTokens } from '@/themes/base/typo.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-primary.scss

const vars = {
  // container
  containerColor: 'inherit',
  containerWidth$sm: '40px',
  containerHeight$sm: '40px',
  containerWidth$md: '56px',
  containerHeight$md: '56px',
  containerWidth$lg: '96px',
  containerHeight$lg: '96px',
  containerShape$sm: shapeTokens.corner$md,
  containerShape$md: shapeTokens.corner$lg,
  containerShape$lg: shapeTokens.corner$xl,
  containerElevation: elevationTokens.boxShadow$level3,
  // &:disabled
  containerColor$disabled: colorRolesTokens.onSurface,
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
  iconSize$sm: '24px',
  iconSize$md: '24px',
  iconSize$lg: '36px',
  iconColor$disabled: colorRolesTokens.onSurface,
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
  labelTextFont: typescaleTokens.labelFont$lg,
  labelTextLineHeight: typescaleTokens.labelLineHeight$lg,
  labelTextSize: typescaleTokens.labelSize$lg,
  labelTextLetterSpacing: typescaleTokens.labelLetterSpacing$lg,
  labelTextWeight: typescaleTokens.labelWeight$lg,
  // &:hover
  labelTextColor$hover: 'inherit',
  // &:focus
  labelTextColor$focus: 'inherit',
  // &:pressed
  labelTextColor$pressed: 'inherit',
  // &:disabled
  labelTextColor$disabled: colorRolesTokens.onSurface,
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
