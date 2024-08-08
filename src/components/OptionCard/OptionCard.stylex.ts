import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';

const vars = {
  // container
  containerColor: colorSchemeTokens.surfaceContainerHigh,

  // selectedOutline
  selectedOutlineColor: colorSchemeTokens.primary,
  selectedOutlineWidth: outlineTokens.width$sm,
  // &:disabled
  selectedOutlineColor$disabled: colorSchemeTokens.outline,
  selectedOutlineOpacity$disabled: stateTokens.containerOpacity$disabled,
  // &:focus
  selectedOutlineColor$focus: colorSchemeTokens.primary,
  // &:hover
  selectedOutlineColor$hover: colorSchemeTokens.primary,
  // &:pressed
  selectedOutlineColor$pressed: colorSchemeTokens.primary,
  selectedOutlineColor$dragged: colorSchemeTokens.primary,

  // text
  textColor: colorSchemeTokens.onSurface,
  textFont: typeScaleTokens.bodyFont$sm,
  textSize: typeScaleTokens.bodySize$sm,
  textLineHeight: typeScaleTokens.bodyLineHeight$sm,
  textLetterSpacing: typeScaleTokens.bodyLetterSpacing$sm,
  textWeight: typeScaleTokens.bodyWeight$sm,
  // &:disabled
  textColor$disabled: colorSchemeTokens.onSurface,
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
