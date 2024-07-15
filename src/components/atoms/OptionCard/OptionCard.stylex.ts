import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';

const vars = {
  // container
  containerColor: colorRolesVars.surfaceContainerHigh,

  // selectedOutline
  selectedOutlineColor: colorRolesVars.primary,
  selectedOutlineWidth: '3px',
  // &:disabled
  selectedOutlineColor$disabled: colorRolesVars.outline,
  selectedOutlineOpacity$disabled: stateVars.containerOpacity$disabled,
  // &:focus
  selectedOutlineColor$focus: colorRolesVars.primary,
  // &:hover
  selectedOutlineColor$hover: colorRolesVars.primary,
  // &:pressed
  selectedOutlineColor$pressed: colorRolesVars.primary,
  selectedOutlineColor$dragged: colorRolesVars.primary,

  // text
  textColor: colorRolesVars.onSurface,
  textFont: typescaleVars.bodyFont$sm,
  textSize: typescaleVars.bodySize$sm,
  textLineHeight: typescaleVars.bodyLineHeight$sm,
  textLetterSpacing: typescaleVars.bodyLetterSpacing$sm,
  textWeight: typescaleVars.bodyWeight$sm,
  // &:disabled
  textColor$disabled: colorRolesVars.onSurface,
  textOpacity$disabled: stateVars.opacity$disabled,
};

export const optionCardTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const optionCardTheme = stylex.createTheme(optionCardTokens, vars);
