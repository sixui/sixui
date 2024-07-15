import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { typescaleTokens } from '@/themes/base/tokens/typo.stylex';
import { shapeTokens } from '@/themes/base/tokens/shape.stylex';
import { stateTokens } from '@/themes/base/tokens/state.stylex';

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
  connectorShape: shapeTokens.corner$full,
  connectorMinLength: '16px',

  // container
  containerShape: shapeTokens.corner$md,

  // bulletPoint
  bulletPointSize: '24px',
  bulletPointShape: shapeTokens.corner$full,
  bulletPointColor: colorRolesTokens.primary,
  // &:inactive
  bulletPointColor$inactive: colorRolesTokens.onSurface,
  bulletPointOpacity$inactive: '0.16',
  // &:completed
  bulletPointColor$completed: colorRolesTokens.primary,
  // &:error
  bulletPointColor$error: colorRolesTokens.error,
  // &:disabled
  bulletPointColor$disabled: colorRolesTokens.onSurface,
  bulletPointOpacity$disabled: stateTokens.containerOpacity$disabled,

  // bulletPointText
  bulletPointTextColor: colorRolesTokens.onPrimary,
  bulletPointTextFont: typescaleTokens.labelFont$md,
  bulletPointTextSize: typescaleTokens.labelSize$md,
  bulletPointTextWeight: typescaleTokens.labelWeight$md,
  bulletPointTextLineHeight: typescaleTokens.labelLineHeight$md,
  bulletPointTextLetterSpacing: typescaleTokens.labelLetterSpacing$md,
  // &:inactive
  bulletPointTextColor$inactive: colorRolesTokens.onSurface,
  // &:completed
  bulletPointTextColor$completed: colorRolesTokens.onPrimary,
  // &:error
  bulletPointTextColor$error: colorRolesTokens.onError,
  // &:disabled
  bulletPointTextColor$disabled: colorRolesTokens.onSurface,
  bulletPointTextOpacity$disabled: stateTokens.opacity$disabled,

  // labelText
  labelTextColor: colorRolesTokens.onSurface,
  labelTextFont: typescaleTokens.labelFont$lg,
  labelTextSize: typescaleTokens.labelSize$lg,
  labelTextWeight: typescaleTokens.labelWeight$lg,
  labelTextLineHeight: typescaleTokens.labelLineHeight$lg,
  labelTextLetterSpacing: typescaleTokens.labelLetterSpacing$lg,
  // &:interactive
  labelTextColor$interactive: colorRolesTokens.primary,
  // &:inactive
  labelTextColor$inactive: colorRolesTokens.onSurface,
  // &:completed
  labelTextColor$completed: colorRolesTokens.onSurface,
  // &:disabled
  labelTextColor$disabled: colorRolesTokens.onSurface,
  labelTextOpacity$disabled: stateTokens.opacity$disabled,
  // &:error
  labelTextColor$error: colorRolesTokens.error,

  // supportingText
  supportingTextColor: colorRolesTokens.onSurface,
  supportingTextFont: typescaleTokens.labelFont$sm,
  supportingTextSize: typescaleTokens.labelSize$sm,
  supportingTextWeight: typescaleTokens.labelWeight$sm,
  supportingTextLineHeight: typescaleTokens.labelLineHeight$sm,
  supportingTextLetterSpacing: typescaleTokens.labelLetterSpacing$sm,
  // &:interactive
  supportingTextColor$interactive: colorRolesTokens.onSurface,
  // &:inactive
  supportingTextColor$inactive: colorRolesTokens.onSurface,
  // &:completed
  supportingTextColor$completed: colorRolesTokens.onSurface,
  // &:disabled
  supportingTextColor$disabled: colorRolesTokens.onSurface,
  supportingTextOpacity$disabled: stateTokens.opacity$disabled,
  // &:error
  supportingTextColor$error: colorRolesTokens.error,

  // contentText
  contentTextColor: colorRolesTokens.onSurface,
  contentTextFont: typescaleTokens.bodyFont$md,
  contentTextSize: typescaleTokens.bodySize$md,
  contentTextWeight: typescaleTokens.bodyWeight$md,
  contentTextLineHeight: typescaleTokens.bodyLineHeight$md,
  contentTextLetterSpacing: typescaleTokens.bodyLetterSpacing$md,
};

export const stepTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const stepTheme = stylex.createTheme(stepTokens, vars);
