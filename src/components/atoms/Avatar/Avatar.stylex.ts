import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IAvatarStyleVarKey } from '@/components/atoms/Avatar';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';

const vars: IStyleVars<IAvatarStyleVarKey> = {
  // container
  containerShape: shapeVars.corner$full,
  containerWidth: '40px',
  containerHeight: '40px',
  containerColor: colorRolesVars.primaryContainer,

  // label
  labelTextColor: colorRolesVars.onPrimaryContainer,
  labelTextFont: typescaleVars.titleFont$md,
  labelTextLineHeight: typescaleVars.titleLineHeight$md,
  labelTextSize: typescaleVars.titleSize$md,
  labelTextLetterSpacing: typescaleVars.titleLetterSpacing$md,
  labelTextWeight: typescaleVars.titleWeight$md,
};

export const avatarTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const avatarTheme = stylex.createTheme(avatarTokens, vars);
