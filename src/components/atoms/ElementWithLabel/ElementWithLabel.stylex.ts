import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';

const vars = {
  // labelText
  labelTextColor: colorRolesVars.onSurface,
  labelTextFont: typescaleVars.labelFont$lg,
  labelTextSize: typescaleVars.labelSize$lg,
  labelTextWeight: typescaleVars.labelWeight$lg,
  labelTextLineHeight: typescaleVars.labelLineHeight$lg,
  labelTextLetterSpacing: typescaleVars.labelLetterSpacing$lg,
  // &:disabled
  labelTextColor$disabled: colorRolesVars.onSurface,
  labelTextOpacity$disabled: stateVars.opacity$disabled,

  // actionText
  actionTextColor: colorRolesVars.onSurface,
  actionTextFont: typescaleVars.labelFont$lg,
  actionTextSize: typescaleVars.labelSize$lg,
  actionTextWeight: typescaleVars.labelWeight$lg,
  actionTextLineHeight: typescaleVars.labelLineHeight$lg,
  actionTextLetterSpacing: typescaleVars.labelLetterSpacing$lg,
  // &:disabled
  actionTextColor$disabled: colorRolesVars.onSurface,
  actionTextOpacity$disabled: stateVars.opacity$disabled,

  // supportingText
  supportingTextColor: colorRolesVars.dim,
  supportingTextFont: typescaleVars.bodyFont$sm,
  supportingTextSize: typescaleVars.bodySize$sm,
  supportingTextWeight: typescaleVars.bodyWeight$sm,
  supportingTextLineHeight: typescaleVars.bodyLineHeight$sm,
  supportingTextLetterSpacing: typescaleVars.bodyLetterSpacing$sm,
  // &:error
  supportingTextColor$error: colorRolesVars.error,
  // &:disabled
  supportingTextColor$disabled: colorRolesVars.onSurface,
  supportingTextOpacity$disabled: stateVars.opacity$disabled,
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
