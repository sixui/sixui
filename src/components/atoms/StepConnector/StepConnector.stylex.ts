import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';

const vars = {
  thickness: '1px',
  color: colorRolesVars.outlineVariant,
  // &:completed
  color$completed: colorRolesVars.primary,

  // text
  textSpace$horizontal: '8px',
  textSpace$vertical: '4px',
  textColor: colorRolesVars.outline,
  textFont: typescaleVars.bodyFont$sm,
  textSize: typescaleVars.bodySize$sm,
  textWeight: typescaleVars.bodyWeight$sm,
  textLineHeight: typescaleVars.bodyLineHeight$sm,
  textLetterSpacing: typescaleVars.bodyLetterSpacing$sm,
  // &:completed
  textColor$completed: colorRolesVars.primary,
};

export const stepConnectorTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const stepConnectorTheme = stylex.createTheme(stepConnectorTokens, vars);
