import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IDialogStyleVarKey } from '@/components/atoms/Dialog';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { stateVars } from '../vars/state.stylex';
import { typescaleVars } from '../vars/typo.stylex';
import { shapeVars } from '../vars/shape.stylex';

const vars: Partial<IStyleVars<IDialogStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.surfaceContainerHigh,
  containerElevation: elevationVars.boxShadow$level3,
  containerShape: shapeVars.corner$xl,

  // icon
  iconColor: colorRolesVars.secondary,
  iconSize: '18px',

  // headline
  headlineColor: colorRolesVars.onSurface,
  headlineFont: typescaleVars.headlineFont$sm,
  headlineLineHeight: typescaleVars.headlineLineHeight$sm,
  headlineSize: typescaleVars.headlineSize$sm,
  headlineLetterSpacing: typescaleVars.headlineLetterSpacing$sm,
  headlineWeight: typescaleVars.headlineWeight$sm,

  // supportingText
  supportingTextColor: colorRolesVars.onSurfaceVariant,
  supportingTextFont: typescaleVars.bodyFont$md,
  supportingTextLineHeight: typescaleVars.bodyLineHeight$md,
  supportingTextSize: typescaleVars.bodySize$md,
  supportingTextLetterSpacing: typescaleVars.bodyLetterSpacing$md,
  supportingTextWeight: typescaleVars.bodyWeight$md,

  // actionLabelText
  actionLabelTextColor: colorRolesVars.primary,
  actionLabelTextFont: typescaleVars.labelFont$lg,
  actionLabelTextLineHeight: typescaleVars.labelLineHeight$lg,
  actionLabelTextSize: typescaleVars.labelSize$lg,
  actionLabelTextLetterSpacing: typescaleVars.labelLetterSpacing$lg,
  actionLabelTextWeight: typescaleVars.labelWeight$lg,
  // &:focus
  actionLabelTextColor$focus: colorRolesVars.primary,
  // &:hover
  actionLabelTextColor$hover: colorRolesVars.primary,
  // &:pressed
  actionLabelTextColor$pressed: colorRolesVars.primary,

  // actionStateLayer
  // &:hover
  actionStateLayerColor$hover: colorRolesVars.primary,
  actionStateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  actionStateLayerColor$pressed: colorRolesVars.primary,
  actionStateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IDialogStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
