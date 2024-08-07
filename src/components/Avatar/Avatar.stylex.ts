import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

const vars = {
  // container
  containerShape: 'unset',
  containerSize: '40px',
  containerColor: colorSchemeTokens.primaryContainer,

  // label
  labelTextColor: colorSchemeTokens.onPrimaryContainer,
  labelTextFont: typeScaleTokens.titleFont$md,
  labelTextLineHeight: typeScaleTokens.titleLineHeight$md,
  labelTextSize: typeScaleTokens.titleSize$md,
  labelTextLetterSpacing: typeScaleTokens.titleLetterSpacing$md,
  labelTextWeight: typeScaleTokens.titleWeight$md,
};

export const avatarTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const avatarTheme = stylex.createTheme(avatarTokens, vars);
