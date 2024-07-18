import stylex from '@stylexjs/stylex';

import { elevationTokens } from '@/components/Elevation/Elevation.stylex';
import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { stateTokens } from '@/themes/base/state.stylex';
import { typeScaleTokens } from '@/themes/base/typeScale.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';

const vars = {
  // container
  containerColor: colorSchemeTokens.surfaceContainerHigh,
  containerElevation: elevationTokens.boxShadow$level3,
  containerShape: shapeTokens.corner$xl,

  // icon
  iconColor: colorSchemeTokens.secondary,
  iconSize: '18px',

  // headline
  headlineColor: colorSchemeTokens.onSurface,
  headlineFont: typeScaleTokens.headlineFont$sm,
  headlineLineHeight: typeScaleTokens.headlineLineHeight$sm,
  headlineSize: typeScaleTokens.headlineSize$sm,
  headlineLetterSpacing: typeScaleTokens.headlineLetterSpacing$sm,
  headlineWeight: typeScaleTokens.headlineWeight$sm,

  // supportingText
  supportingTextColor: colorSchemeTokens.onSurfaceVariant,
  supportingTextFont: typeScaleTokens.bodyFont$md,
  supportingTextLineHeight: typeScaleTokens.bodyLineHeight$md,
  supportingTextSize: typeScaleTokens.bodySize$md,
  supportingTextLetterSpacing: typeScaleTokens.bodyLetterSpacing$md,
  supportingTextWeight: typeScaleTokens.bodyWeight$md,

  // actionLabelText
  actionLabelTextColor: colorSchemeTokens.primary,
  actionLabelTextFont: typeScaleTokens.labelFont$lg,
  actionLabelTextLineHeight: typeScaleTokens.labelLineHeight$lg,
  actionLabelTextSize: typeScaleTokens.labelSize$lg,
  actionLabelTextLetterSpacing: typeScaleTokens.labelLetterSpacing$lg,
  actionLabelTextWeight: typeScaleTokens.labelWeight$lg,
  // &:focus
  actionLabelTextColor$focus: colorSchemeTokens.primary,
  // &:hover
  actionLabelTextColor$hover: colorSchemeTokens.primary,
  // &:pressed
  actionLabelTextColor$pressed: colorSchemeTokens.primary,

  // actionStateLayer
  // &:hover
  actionStateLayerColor$hover: colorSchemeTokens.primary,
  actionStateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  actionStateLayerColor$pressed: colorSchemeTokens.primary,
  actionStateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,
};

export const dialogContentTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const dialogContentTheme = stylex.createTheme(dialogContentTokens, vars);
