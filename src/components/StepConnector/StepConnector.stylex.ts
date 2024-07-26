import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

const vars = {
  thickness: '1px',
  color: colorSchemeTokens.outlineVariant,
  // &:completed
  color$completed: colorSchemeTokens.primary,

  // text
  textSpace$horizontal: '8px',
  textSpace$vertical: '4px',
  textColor: colorSchemeTokens.outline,
  textFont: typeScaleTokens.bodyFont$sm,
  textSize: typeScaleTokens.bodySize$sm,
  textWeight: typeScaleTokens.bodyWeight$sm,
  textLineHeight: typeScaleTokens.bodyLineHeight$sm,
  textLetterSpacing: typeScaleTokens.bodyLetterSpacing$sm,
  // &:completed
  textColor$completed: colorSchemeTokens.primary,
};

export const stepConnectorTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const stepConnectorTheme = stylex.createTheme(stepConnectorTokens, vars);
