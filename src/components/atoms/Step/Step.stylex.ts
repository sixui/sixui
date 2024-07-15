import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';

const vars = {
  gap: '8px',
  leadingSpace: '8px',
  trailingSpace: '8px',

  /**
   * For a proper rendering, should be at least (StepConnector.thickness / 2).
   */
  topSpace: '8px',

  /**
   * For a proper rendering, should be at least (StepConnector.thickness / 2).
   */
  bottomSpace: '8px',

  // bulletPoint
  bulletPointSpace: '8px',

  // connector
  connectorShape: shapeVars.corner$full,
  connectorMinLength: '16px',

  // container
  containerShape: shapeVars.corner$md,

  // bulletPoint
  bulletPointSize: '24px',
  bulletPointShape: shapeVars.corner$full,
  bulletPointColor: colorRolesVars.primary,
  // &:inactive
  bulletPointColor$inactive: colorRolesVars.onSurface,
  bulletPointOpacity$inactive: '0.16',
  // &:completed
  bulletPointColor$completed: colorRolesVars.primary,
  // &:error
  bulletPointColor$error: colorRolesVars.error,
  // &:disabled
  bulletPointColor$disabled: colorRolesVars.onSurface,
  bulletPointOpacity$disabled: stateVars.containerOpacity$disabled,

  // bulletPointText
  bulletPointTextColor: colorRolesVars.onPrimary,
  bulletPointTextFont: typescaleVars.labelFont$md,
  bulletPointTextSize: typescaleVars.labelSize$md,
  bulletPointTextWeight: typescaleVars.labelWeight$md,
  bulletPointTextLineHeight: typescaleVars.labelLineHeight$md,
  bulletPointTextLetterSpacing: typescaleVars.labelLetterSpacing$md,
  // &:inactive
  bulletPointTextColor$inactive: colorRolesVars.onSurface,
  // &:completed
  bulletPointTextColor$completed: colorRolesVars.onPrimary,
  // &:error
  bulletPointTextColor$error: colorRolesVars.onError,
  // &:disabled
  bulletPointTextColor$disabled: colorRolesVars.onSurface,
  bulletPointTextOpacity$disabled: stateVars.opacity$disabled,

  // labelText
  labelTextColor: colorRolesVars.onSurface,
  labelTextFont: typescaleVars.labelFont$lg,
  labelTextSize: typescaleVars.labelSize$lg,
  labelTextWeight: typescaleVars.labelWeight$lg,
  labelTextLineHeight: typescaleVars.labelLineHeight$lg,
  labelTextLetterSpacing: typescaleVars.labelLetterSpacing$lg,
  // &:interactive
  labelTextColor$interactive: colorRolesVars.primary,
  // &:inactive
  labelTextColor$inactive: colorRolesVars.onSurface,
  // &:completed
  labelTextColor$completed: colorRolesVars.onSurface,
  // &:disabled
  labelTextColor$disabled: colorRolesVars.onSurface,
  labelTextOpacity$disabled: stateVars.opacity$disabled,
  // &:error
  labelTextColor$error: colorRolesVars.error,

  // supportingText
  supportingTextColor: colorRolesVars.onSurface,
  supportingTextFont: typescaleVars.labelFont$sm,
  supportingTextSize: typescaleVars.labelSize$sm,
  supportingTextWeight: typescaleVars.labelWeight$sm,
  supportingTextLineHeight: typescaleVars.labelLineHeight$sm,
  supportingTextLetterSpacing: typescaleVars.labelLetterSpacing$sm,
  // &:interactive
  supportingTextColor$interactive: colorRolesVars.onSurface,
  // &:inactive
  supportingTextColor$inactive: colorRolesVars.onSurface,
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

export const stepTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const stepTheme = stylex.createTheme(stepTokens, vars);
