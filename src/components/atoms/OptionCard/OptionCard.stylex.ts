import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { typescaleTokens } from '@/themes/base/tokens/typo.stylex';
import { stateTokens } from '@/themes/base/tokens/state.stylex';

const vars = {
  // container
  containerColor: colorRolesTokens.surfaceContainerHigh,

  // selectedOutline
  selectedOutlineColor: colorRolesTokens.primary,
  selectedOutlineWidth: '3px',
  // &:disabled
  selectedOutlineColor$disabled: colorRolesTokens.outline,
  selectedOutlineOpacity$disabled: stateTokens.containerOpacity$disabled,
  // &:focus
  selectedOutlineColor$focus: colorRolesTokens.primary,
  // &:hover
  selectedOutlineColor$hover: colorRolesTokens.primary,
  // &:pressed
  selectedOutlineColor$pressed: colorRolesTokens.primary,
  selectedOutlineColor$dragged: colorRolesTokens.primary,

  // text
  textColor: colorRolesTokens.onSurface,
  textFont: typescaleTokens.bodyFont$sm,
  textSize: typescaleTokens.bodySize$sm,
  textLineHeight: typescaleTokens.bodyLineHeight$sm,
  textLetterSpacing: typescaleTokens.bodyLetterSpacing$sm,
  textWeight: typescaleTokens.bodyWeight$sm,
  // &:disabled
  textColor$disabled: colorRolesTokens.onSurface,
  textOpacity$disabled: stateTokens.opacity$disabled,
};

export const optionCardTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const optionCardTheme = stylex.createTheme(optionCardTokens, vars);
