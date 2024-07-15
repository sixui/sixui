import stylex from '@stylexjs/stylex';

import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { stateTokens } from '@/themes/base/tokens/state.stylex';
import { typescaleTokens } from '@/themes/base/tokens/typo.stylex';
import { shapeTokens } from '@/themes/base/tokens/shape.stylex';

const vars = {
  // container
  containerColor: colorRolesTokens.surfaceContainerHigh,
  containerElevation: elevationTokens.boxShadow$level3,
  containerShape: shapeTokens.corner$xl,

  // icon
  iconColor: colorRolesTokens.secondary,
  iconSize: '18px',

  // headline
  headlineColor: colorRolesTokens.onSurface,
  headlineFont: typescaleTokens.headlineFont$sm,
  headlineLineHeight: typescaleTokens.headlineLineHeight$sm,
  headlineSize: typescaleTokens.headlineSize$sm,
  headlineLetterSpacing: typescaleTokens.headlineLetterSpacing$sm,
  headlineWeight: typescaleTokens.headlineWeight$sm,

  // supportingText
  supportingTextColor: colorRolesTokens.onSurfaceVariant,
  supportingTextFont: typescaleTokens.bodyFont$md,
  supportingTextLineHeight: typescaleTokens.bodyLineHeight$md,
  supportingTextSize: typescaleTokens.bodySize$md,
  supportingTextLetterSpacing: typescaleTokens.bodyLetterSpacing$md,
  supportingTextWeight: typescaleTokens.bodyWeight$md,

  // actionLabelText
  actionLabelTextColor: colorRolesTokens.primary,
  actionLabelTextFont: typescaleTokens.labelFont$lg,
  actionLabelTextLineHeight: typescaleTokens.labelLineHeight$lg,
  actionLabelTextSize: typescaleTokens.labelSize$lg,
  actionLabelTextLetterSpacing: typescaleTokens.labelLetterSpacing$lg,
  actionLabelTextWeight: typescaleTokens.labelWeight$lg,
  // &:focus
  actionLabelTextColor$focus: colorRolesTokens.primary,
  // &:hover
  actionLabelTextColor$hover: colorRolesTokens.primary,
  // &:pressed
  actionLabelTextColor$pressed: colorRolesTokens.primary,

  // actionStateLayer
  // &:hover
  actionStateLayerColor$hover: colorRolesTokens.primary,
  actionStateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  actionStateLayerColor$pressed: colorRolesTokens.primary,
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
