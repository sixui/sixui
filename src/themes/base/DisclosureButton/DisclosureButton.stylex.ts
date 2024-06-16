import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IDisclosureButtonStyleVarKey } from '@/components/atoms/DisclosureButton';
import { typescaleVars } from '../vars/typo.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { stateVars } from '../vars/state.stylex';

const vars: IStyleVars<IDisclosureButtonStyleVarKey> = {
  // container
  containerShape: shapeVars.corner$sm,
  containerColor: colorRolesVars.secondaryContainer,
  containerOpacity: '1',
  // &:disabled
  containerColor$disabled: colorRolesVars.onSurface,
  containerOpacity$disabled: stateVars.containerOpacity$disabled,

  // expandedContainer
  expandedContainerColor: colorRolesVars.secondaryContainer,
  expandedContainerOpacity: '1',
  // &:disabled
  expandedContainerColor$disabled: colorRolesVars.onSurface,
  expandedContainerOpacity$disabled: stateVars.containerOpacity$disabled,

  // uncheckedContainer
  uncheckedContainerColor: colorRolesVars.onSurface,
  uncheckedContainerOpacity: stateVars.containerOpacity$disabled,
  // &:disabled
  uncheckedContainerColor$disabled: colorRolesVars.onSurface,
  uncheckedContainerOpacity$disabled: stateVars.containerOpacity$disabled,

  // text
  textColor: colorRolesVars.onSecondaryContainer,
  textColor$disabled: colorRolesVars.onSurface,
  textColor$focus: colorRolesVars.onSecondaryContainer,
  textColor$hover: colorRolesVars.onSecondaryContainer,
  textColor$pressed: colorRolesVars.onSecondaryContainer,
  textFont: typescaleVars.titleFont$md,
  textLineHeight: typescaleVars.titleLineHeight$md,
  textSize: typescaleVars.titleSize$md,
  textLetterSpacing: typescaleVars.titleLetterSpacing$md,
  textWeight: typescaleVars.titleWeight$md,

  // expandedText
  expandedTextColor: colorRolesVars.onSecondaryContainer,
  expandedTextColor$disabled: colorRolesVars.onSurface,
  expandedTextColor$focus: colorRolesVars.onSecondaryContainer,
  expandedTextColor$hover: colorRolesVars.onSecondaryContainer,
  expandedTextColor$pressed: colorRolesVars.onSecondaryContainer,

  // icon
  iconColor: colorRolesVars.onSecondaryContainer,
  iconColor$disabled: colorRolesVars.onSurface,
  iconColor$focus: colorRolesVars.onSecondaryContainer,
  iconColor$hover: colorRolesVars.onSecondaryContainer,
  iconColor$pressed: colorRolesVars.onSecondaryContainer,

  // expandedIcon
  expandedIconColor: colorRolesVars.onSecondaryContainer,
  expandedIconColor$disabled: colorRolesVars.onSurface,
  expandedIconColor$focus: colorRolesVars.onSecondaryContainer,
  expandedIconColor$hover: colorRolesVars.onSecondaryContainer,
  expandedIconColor$pressed: colorRolesVars.onSecondaryContainer,
};

export const componentVars = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
