import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

const MIN_DENSITY = -1;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

const vars = {
  leadingSpace: spacingTokens.padding$2,
  trailingSpace: spacingTokens.padding$2,

  /**
   * For a proper rendering, should be at least (StepConnector.thickness / 2).
   */
  topSpace: `calc(${spacingTokens.padding$2} + ${DENSITY})`,

  /**
   * For a proper rendering, should be at least (StepConnector.thickness / 2).
   */
  bottomSpace: `calc(${spacingTokens.padding$2} + ${DENSITY})`,

  // bulletPoint
  bulletPointSpace: spacingTokens.padding$2,

  // connector
  connectorShape: shapeTokens.corner$full,
  connectorMinLength: spacingTokens.padding$4,

  // container
  containerShape: shapeTokens.corner$md,

  // bulletPoint
  bulletPointSize: `calc(24px * ${scaleTokens.scale})`,
  bulletPointShape: shapeTokens.corner$full,
  bulletPointColor: colorSchemeTokens.primary,
  // &:inactive
  bulletPointColor$inactive: colorSchemeTokens.onSurface,
  bulletPointOpacity$inactive: '0.16',
  // &:completed
  bulletPointColor$completed: colorSchemeTokens.primary,
  // &:error
  bulletPointColor$error: colorSchemeTokens.error,
  // &:disabled
  bulletPointColor$disabled: colorSchemeTokens.onSurface,
  bulletPointOpacity$disabled: stateTokens.containerOpacity$disabled,

  // bulletPointText
  bulletPointTextColor: colorSchemeTokens.onPrimary,
  bulletPointTextFont: typeScaleTokens.labelFont$md,
  bulletPointTextSize: typeScaleTokens.labelSize$md,
  bulletPointTextWeight: typeScaleTokens.labelWeight$md,
  bulletPointTextLineHeight: typeScaleTokens.labelLineHeight$md,
  bulletPointTextLetterSpacing: typeScaleTokens.labelLetterSpacing$md,
  // &:inactive
  bulletPointTextColor$inactive: colorSchemeTokens.onSurface,
  // &:completed
  bulletPointTextColor$completed: colorSchemeTokens.onPrimary,
  // &:error
  bulletPointTextColor$error: colorSchemeTokens.onError,
  // &:disabled
  bulletPointTextColor$disabled: colorSchemeTokens.onSurface,
  bulletPointTextOpacity$disabled: stateTokens.opacity$disabled,

  // labelText
  labelTextColor: colorSchemeTokens.onSurface,
  labelTextFont: typeScaleTokens.labelFont$lg,
  labelTextSize: typeScaleTokens.labelSize$lg,
  labelTextWeight: typeScaleTokens.labelWeight$lg,
  labelTextLineHeight: typeScaleTokens.labelLineHeight$lg,
  labelTextLetterSpacing: typeScaleTokens.labelLetterSpacing$lg,
  // &:interactive
  labelTextColor$interactive: colorSchemeTokens.primary,
  // &:inactive
  labelTextColor$inactive: colorSchemeTokens.onSurface,
  // &:completed
  labelTextColor$completed: colorSchemeTokens.onSurface,
  // &:disabled
  labelTextColor$disabled: colorSchemeTokens.onSurface,
  labelTextOpacity$disabled: stateTokens.opacity$disabled,
  // &:error
  labelTextColor$error: colorSchemeTokens.error,

  // supportingText
  supportingTextColor: colorSchemeTokens.onSurface,
  supportingTextFont: typeScaleTokens.labelFont$sm,
  supportingTextSize: typeScaleTokens.labelSize$sm,
  supportingTextWeight: typeScaleTokens.labelWeight$sm,
  supportingTextLineHeight: typeScaleTokens.labelLineHeight$sm,
  supportingTextLetterSpacing: typeScaleTokens.labelLetterSpacing$sm,
  // &:interactive
  supportingTextColor$interactive: colorSchemeTokens.onSurface,
  // &:inactive
  supportingTextColor$inactive: colorSchemeTokens.onSurface,
  // &:completed
  supportingTextColor$completed: colorSchemeTokens.onSurface,
  // &:disabled
  supportingTextColor$disabled: colorSchemeTokens.onSurface,
  supportingTextOpacity$disabled: stateTokens.opacity$disabled,
  // &:error
  supportingTextColor$error: colorSchemeTokens.error,

  // contentText
  contentTextColor: colorSchemeTokens.onSurface,
  contentTextFont: typeScaleTokens.bodyFont$md,
  contentTextSize: typeScaleTokens.bodySize$md,
  contentTextWeight: typeScaleTokens.bodyWeight$md,
  contentTextLineHeight: typeScaleTokens.bodyLineHeight$md,
  contentTextLetterSpacing: typeScaleTokens.bodyLetterSpacing$md,
};

export const stepTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const stepTheme = stylex.createTheme(stepTokens, vars);
