import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { typescaleTokens } from '@/themes/base/typo.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';

const vars = {
  // container
  containerShape: shapeTokens.corner$full,
  containerWidth: '40px',
  containerHeight: '40px',
  containerColor: colorRolesTokens.primaryContainer,

  // label
  labelTextColor: colorRolesTokens.onPrimaryContainer,
  labelTextFont: typescaleTokens.titleFont$md,
  labelTextLineHeight: typescaleTokens.titleLineHeight$md,
  labelTextSize: typescaleTokens.titleSize$md,
  labelTextLetterSpacing: typescaleTokens.titleLetterSpacing$md,
  labelTextWeight: typescaleTokens.titleWeight$md,
};

export const avatarTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const avatarTheme = stylex.createTheme(avatarTokens, vars);
