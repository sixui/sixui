import stylex from '@stylexjs/stylex';

import { typescaleTokens } from '@/themes/base/tokens/typo.stylex';
import { shapeTokens } from '@/themes/base/tokens/shape.stylex';
import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { stateTokens } from '@/themes/base/tokens/state.stylex';

const vars = {
  // container
  containerShape: shapeTokens.corner$sm,
  containerColor: colorRolesTokens.secondaryContainer,
  containerOpacity: '1',
  // &:disabled
  containerColor$disabled: colorRolesTokens.onSurface,
  containerOpacity$disabled: stateTokens.containerOpacity$disabled,

  // expandedContainer
  expandedContainerColor: colorRolesTokens.secondaryContainer,
  expandedContainerOpacity: '1',
  // &:disabled
  expandedContainerColor$disabled: colorRolesTokens.onSurface,
  expandedContainerOpacity$disabled: stateTokens.containerOpacity$disabled,

  // uncheckedContainer
  uncheckedContainerColor: colorRolesTokens.onSurface,
  uncheckedContainerOpacity: stateTokens.containerOpacity$disabled,
  // &:disabled
  uncheckedContainerColor$disabled: colorRolesTokens.onSurface,
  uncheckedContainerOpacity$disabled: stateTokens.containerOpacity$disabled,

  // text
  textColor: colorRolesTokens.onSecondaryContainer,
  textColor$disabled: colorRolesTokens.onSurface,
  textColor$focus: colorRolesTokens.onSecondaryContainer,
  textColor$hover: colorRolesTokens.onSecondaryContainer,
  textColor$pressed: colorRolesTokens.onSecondaryContainer,
  textFont: typescaleTokens.titleFont$md,
  textLineHeight: typescaleTokens.titleLineHeight$md,
  textSize: typescaleTokens.titleSize$md,
  textLetterSpacing: typescaleTokens.titleLetterSpacing$md,
  textWeight: typescaleTokens.titleWeight$md,

  // expandedText
  expandedTextColor: colorRolesTokens.onSecondaryContainer,
  expandedTextColor$disabled: colorRolesTokens.onSurface,
  expandedTextColor$focus: colorRolesTokens.onSecondaryContainer,
  expandedTextColor$hover: colorRolesTokens.onSecondaryContainer,
  expandedTextColor$pressed: colorRolesTokens.onSecondaryContainer,

  // icon
  iconColor: colorRolesTokens.onSecondaryContainer,
  iconColor$disabled: colorRolesTokens.onSurface,
  iconColor$focus: colorRolesTokens.onSecondaryContainer,
  iconColor$hover: colorRolesTokens.onSecondaryContainer,
  iconColor$pressed: colorRolesTokens.onSecondaryContainer,

  // expandedIcon
  expandedIconColor: colorRolesTokens.onSecondaryContainer,
  expandedIconColor$disabled: colorRolesTokens.onSurface,
  expandedIconColor$focus: colorRolesTokens.onSecondaryContainer,
  expandedIconColor$hover: colorRolesTokens.onSecondaryContainer,
  expandedIconColor$pressed: colorRolesTokens.onSecondaryContainer,
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
