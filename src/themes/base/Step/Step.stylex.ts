import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IStepStyleVarKey } from '@/components/atoms/Step';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { typescaleVars } from '../vars/typo.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { stateVars } from '../vars/state.stylex';

const vars: Partial<IStyleVars<IStepStyleVarKey>> = {
  gap: '8px',
  leadingSpace: '8px',
  trailingSpace: '8px',
  topSpace: '8px',
  bottomSpace: '8px',

  // container
  // &:horizontal
  containerShape$horizontal: shapeVars.corner$full,
  // &:vertical
  containerShape$vertical: shapeVars.corner$md,

  // bulletPoint
  bulletPointSize: '24px',
  bulletPointShape: shapeVars.corner$full,
  bulletPointColor: colorRolesVars.secondaryContainer,
  bulletPointTextColor: colorRolesVars.secondary,
  bulletPointTextFont: typescaleVars.labelFont$md,
  bulletPointTextSize: typescaleVars.labelSize$md,
  bulletPointTextWeight: typescaleVars.labelWeight$md,
  bulletPointTextLineHeight: typescaleVars.labelLineHeight$md,
  bulletPointTextLetterSpacing: typescaleVars.labelLetterSpacing$md,
  // &:active
  bulletPointColor$active: colorRolesVars.primary,
  bulletPointTextColor$active: colorRolesVars.onPrimary,
  // &:completed
  bulletPointColor$completed: colorRolesVars.primary,
  bulletPointTextColor$completed: colorRolesVars.onPrimary,
  // &:error
  bulletPointColor$error: colorRolesVars.error,
  bulletPointTextColor$error: colorRolesVars.onError,
  // &:disabled
  bulletPointColor$disabled: colorRolesVars.onSurface,
  bulletPointTextColor$disabled: colorRolesVars.surface,
  bulletPointOpacity$disabled: stateVars.opacity$disabled,

  // labelText
  labelTextColor: colorRolesVars.secondary,
  labelTextFont: typescaleVars.labelFont$lg,
  labelTextSize: typescaleVars.labelSize$lg,
  labelTextWeight: typescaleVars.labelWeight$lg,
  labelTextLineHeight: typescaleVars.labelLineHeight$lg,
  labelTextLetterSpacing: typescaleVars.labelLetterSpacing$lg,
  // &:active
  labelTextColor$active: colorRolesVars.onSurface,
  // &:completed
  labelTextColor$completed: colorRolesVars.onSurface,
  // &:disabled
  labelTextColor$disabled: colorRolesVars.onSurface,
  labelTextOpacity$disabled: stateVars.opacity$disabled,
  // &:error
  labelTextColor$error: colorRolesVars.error,

  // supportingText
  supportingTextColor: colorRolesVars.secondary,
  supportingTextFont: typescaleVars.labelFont$sm,
  supportingTextSize: typescaleVars.labelSize$sm,
  supportingTextWeight: typescaleVars.labelWeight$sm,
  supportingTextLineHeight: typescaleVars.labelLineHeight$sm,
  supportingTextLetterSpacing: typescaleVars.labelLetterSpacing$sm,
  // &:active
  supportingTextColor$active: colorRolesVars.onSurface,
  // &:completed
  supportingTextColor$completed: colorRolesVars.onSurface,
  // &:disabled
  supportingTextColor$disabled: colorRolesVars.onSurface,
  supportingTextOpacity$disabled: stateVars.opacity$disabled,
  // &:error
  supportingTextColor$error: colorRolesVars.error,

  // contentText
  contentTextColor: colorRolesVars.onSurface,
  contentTextFont: typescaleVars.bodyFont$md,
  contentTextSize: typescaleVars.bodySize$md,
  contentTextWeight: typescaleVars.bodyWeight$md,
  contentTextLineHeight: typescaleVars.bodyLineHeight$md,
  contentTextLetterSpacing: typescaleVars.bodyLetterSpacing$md,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IStepStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
