import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';

const vars = {
  // container
  containerColor: colorRolesVars.error,
  containerShape: shapeVars.corner$full,
  containerShape$dot: shapeVars.corner$full,
  containerMinWidth: '16px',
  containerHeight: '16px',
  containerWidth$dot: '8px',
  containerHeight$dot: '8px',
  containerPadding: '4px',
  // &:disabled
  containerColor$disabled: colorRolesVars.onSurface,
  containerOpacity$disabled: stateVars.containerOpacity$disabled,

  // labelText
  labelTextColor: colorRolesVars.onError,
  labelTextFont: typescaleVars.labelFont$sm,
  labelTextLineHeight: typescaleVars.labelLineHeight$sm,
  labelTextSize: typescaleVars.labelSize$sm,
  labelTextLetterSpacing: typescaleVars.labelLetterSpacing$sm,
  labelTextWeight: typescaleVars.labelWeight$sm,
  // &:disabled
  labelTextColor$disabled: colorRolesVars.onSurface,
  labelTextOpacity$disabled: stateVars.opacity$disabled,
};

export type IBadgeToken = keyof typeof vars;

export const badgeTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const badgeTheme = stylex.createTheme(badgeTokens, vars);
