import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { typeScaleTokens } from '@/themes/base/typeScale.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { stateTokens } from '@/themes/base/state.stylex';

const vars = {
  // container
  containerColor: colorSchemeTokens.error,
  containerShape: shapeTokens.corner$full,
  containerShape$dot: shapeTokens.corner$full,
  containerMinWidth: '16px',
  containerHeight: '16px',
  containerWidth$dot: '8px',
  containerHeight$dot: '8px',
  containerPadding: '4px',
  // &:disabled
  containerColor$disabled: colorSchemeTokens.onSurface,
  containerOpacity$disabled: stateTokens.containerOpacity$disabled,

  // labelText
  labelTextColor: colorSchemeTokens.onError,
  labelTextFont: typeScaleTokens.labelFont$sm,
  labelTextLineHeight: typeScaleTokens.labelLineHeight$sm,
  labelTextSize: typeScaleTokens.labelSize$sm,
  labelTextLetterSpacing: typeScaleTokens.labelLetterSpacing$sm,
  labelTextWeight: typeScaleTokens.labelWeight$sm,
  // &:disabled
  labelTextColor$disabled: colorSchemeTokens.onSurface,
  labelTextOpacity$disabled: stateTokens.opacity$disabled,
};

export const badgeTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const badgeTheme = stylex.createTheme(badgeTokens, vars);
