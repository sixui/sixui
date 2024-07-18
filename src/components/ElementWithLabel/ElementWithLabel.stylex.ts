import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { typeScaleTokens } from '@/themes/base/typeScale.stylex';
import { stateTokens } from '@/themes/base/state.stylex';

const vars = {
  // labelText
  labelTextColor: colorSchemeTokens.onSurface,
  labelTextFont: typeScaleTokens.labelFont$lg,
  labelTextSize: typeScaleTokens.labelSize$lg,
  labelTextWeight: typeScaleTokens.labelWeight$lg,
  labelTextLineHeight: typeScaleTokens.labelLineHeight$lg,
  labelTextLetterSpacing: typeScaleTokens.labelLetterSpacing$lg,
  // &:disabled
  labelTextColor$disabled: colorSchemeTokens.onSurface,
  labelTextOpacity$disabled: stateTokens.opacity$disabled,

  // actionText
  actionTextColor: colorSchemeTokens.onSurface,
  actionTextFont: typeScaleTokens.labelFont$lg,
  actionTextSize: typeScaleTokens.labelSize$lg,
  actionTextWeight: typeScaleTokens.labelWeight$lg,
  actionTextLineHeight: typeScaleTokens.labelLineHeight$lg,
  actionTextLetterSpacing: typeScaleTokens.labelLetterSpacing$lg,
  // &:disabled
  actionTextColor$disabled: colorSchemeTokens.onSurface,
  actionTextOpacity$disabled: stateTokens.opacity$disabled,

  // supportingText
  supportingTextColor: colorSchemeTokens.onSurfaceVariant,
  supportingTextFont: typeScaleTokens.bodyFont$sm,
  supportingTextSize: typeScaleTokens.bodySize$sm,
  supportingTextWeight: typeScaleTokens.bodyWeight$sm,
  supportingTextLineHeight: typeScaleTokens.bodyLineHeight$sm,
  supportingTextLetterSpacing: typeScaleTokens.bodyLetterSpacing$sm,
  // &:error
  supportingTextColor$error: colorSchemeTokens.error,
  // &:disabled
  supportingTextColor$disabled: colorSchemeTokens.onSurface,
  supportingTextOpacity$disabled: stateTokens.opacity$disabled,
};

export const elementWithLabelTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const elementWithLabelTheme = stylex.createTheme(
  elementWithLabelTokens,
  vars,
);
