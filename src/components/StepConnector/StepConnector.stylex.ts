import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { typescaleTokens } from '@/themes/base/typo.stylex';

const vars = {
  thickness: '1px',
  color: colorRolesTokens.outlineVariant,
  // &:completed
  color$completed: colorRolesTokens.primary,

  // text
  textSpace$horizontal: '8px',
  textSpace$vertical: '4px',
  textColor: colorRolesTokens.outline,
  textFont: typescaleTokens.bodyFont$sm,
  textSize: typescaleTokens.bodySize$sm,
  textWeight: typescaleTokens.bodyWeight$sm,
  textLineHeight: typescaleTokens.bodyLineHeight$sm,
  textLetterSpacing: typescaleTokens.bodyLetterSpacing$sm,
  // &:completed
  textColor$completed: colorRolesTokens.primary,
};

export const stepConnectorTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const stepConnectorTheme = stylex.createTheme(stepConnectorTokens, vars);
