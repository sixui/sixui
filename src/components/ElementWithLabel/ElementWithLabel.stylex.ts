import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { typescaleTokens } from '@/themes/base/typo.stylex';
import { stateTokens } from '@/themes/base/state.stylex';

const vars = {
  // labelText
  labelTextColor: colorRolesTokens.onSurface,
  labelTextFont: typescaleTokens.labelFont$lg,
  labelTextSize: typescaleTokens.labelSize$lg,
  labelTextWeight: typescaleTokens.labelWeight$lg,
  labelTextLineHeight: typescaleTokens.labelLineHeight$lg,
  labelTextLetterSpacing: typescaleTokens.labelLetterSpacing$lg,
  // &:disabled
  labelTextColor$disabled: colorRolesTokens.onSurface,
  labelTextOpacity$disabled: stateTokens.opacity$disabled,

  // actionText
  actionTextColor: colorRolesTokens.onSurface,
  actionTextFont: typescaleTokens.labelFont$lg,
  actionTextSize: typescaleTokens.labelSize$lg,
  actionTextWeight: typescaleTokens.labelWeight$lg,
  actionTextLineHeight: typescaleTokens.labelLineHeight$lg,
  actionTextLetterSpacing: typescaleTokens.labelLetterSpacing$lg,
  // &:disabled
  actionTextColor$disabled: colorRolesTokens.onSurface,
  actionTextOpacity$disabled: stateTokens.opacity$disabled,

  // supportingText
  supportingTextColor: colorRolesTokens.onSurfaceVariant,
  supportingTextFont: typescaleTokens.bodyFont$sm,
  supportingTextSize: typescaleTokens.bodySize$sm,
  supportingTextWeight: typescaleTokens.bodyWeight$sm,
  supportingTextLineHeight: typescaleTokens.bodyLineHeight$sm,
  supportingTextLetterSpacing: typescaleTokens.bodyLetterSpacing$sm,
  // &:error
  supportingTextColor$error: colorRolesTokens.error,
  // &:disabled
  supportingTextColor$disabled: colorRolesTokens.onSurface,
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
