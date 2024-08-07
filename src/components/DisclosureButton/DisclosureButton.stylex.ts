import stylex from '@stylexjs/stylex';

import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

const vars = {
  // container
  containerShape: shapeTokens.corner$sm,
  containerColor: colorSchemeTokens.secondaryContainer,
  containerOpacity: '1',
  // &:disabled
  containerColor$disabled: colorSchemeTokens.onSurface,
  containerOpacity$disabled: stateTokens.containerOpacity$disabled,

  // expandedContainer
  expandedContainerColor: colorSchemeTokens.secondaryContainer,
  expandedContainerOpacity: '1',
  // &:disabled
  expandedContainerColor$disabled: colorSchemeTokens.onSurface,
  expandedContainerOpacity$disabled: stateTokens.containerOpacity$disabled,

  // uncheckedContainer
  uncheckedContainerColor: colorSchemeTokens.onSurface,
  uncheckedContainerOpacity: stateTokens.containerOpacity$disabled,
  // &:disabled
  uncheckedContainerColor$disabled: colorSchemeTokens.onSurface,
  uncheckedContainerOpacity$disabled: stateTokens.containerOpacity$disabled,

  // text
  textColor: colorSchemeTokens.onSecondaryContainer,
  textColor$disabled: colorSchemeTokens.onSurface,
  textColor$focus: colorSchemeTokens.onSecondaryContainer,
  textColor$hover: colorSchemeTokens.onSecondaryContainer,
  textColor$pressed: colorSchemeTokens.onSecondaryContainer,
  textFont: typeScaleTokens.titleFont$md,
  textLineHeight: typeScaleTokens.titleLineHeight$md,
  textSize: typeScaleTokens.titleSize$md,
  textLetterSpacing: typeScaleTokens.titleLetterSpacing$md,
  textWeight: typeScaleTokens.titleWeight$md,

  // expandedText
  expandedTextColor: colorSchemeTokens.onSecondaryContainer,
  expandedTextColor$disabled: colorSchemeTokens.onSurface,
  expandedTextColor$focus: colorSchemeTokens.onSecondaryContainer,
  expandedTextColor$hover: colorSchemeTokens.onSecondaryContainer,
  expandedTextColor$pressed: colorSchemeTokens.onSecondaryContainer,

  // icon
  iconColor: colorSchemeTokens.onSecondaryContainer,
  iconColor$disabled: colorSchemeTokens.onSurface,
  iconColor$focus: colorSchemeTokens.onSecondaryContainer,
  iconColor$hover: colorSchemeTokens.onSecondaryContainer,
  iconColor$pressed: colorSchemeTokens.onSecondaryContainer,

  // expandedIcon
  expandedIconColor: colorSchemeTokens.onSecondaryContainer,
  expandedIconColor$disabled: colorSchemeTokens.onSurface,
  expandedIconColor$focus: colorSchemeTokens.onSecondaryContainer,
  expandedIconColor$hover: colorSchemeTokens.onSecondaryContainer,
  expandedIconColor$pressed: colorSchemeTokens.onSecondaryContainer,

  // toggle
  toggleLeadingSpace: spacingTokens.padding$4,
  toggleTrailingSpace: spacingTokens.padding$4,
};

export const disclosureButtonTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const disclosureButtonTheme = stylex.createTheme(
  disclosureButtonTokens,
  vars,
);
