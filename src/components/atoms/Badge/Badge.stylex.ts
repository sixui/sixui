import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { typescaleTokens } from '@/themes/base/tokens/typo.stylex';
import { shapeTokens } from '@/themes/base/tokens/shape.stylex';
import { stateTokens } from '@/themes/base/tokens/state.stylex';

const vars = {
  // container
  containerColor: colorRolesTokens.error,
  containerShape: shapeTokens.corner$full,
  containerShape$dot: shapeTokens.corner$full,
  containerMinWidth: '16px',
  containerHeight: '16px',
  containerWidth$dot: '8px',
  containerHeight$dot: '8px',
  containerPadding: '4px',
  // &:disabled
  containerColor$disabled: colorRolesTokens.onSurface,
  containerOpacity$disabled: stateTokens.containerOpacity$disabled,

  // labelText
  labelTextColor: colorRolesTokens.onError,
  labelTextFont: typescaleTokens.labelFont$sm,
  labelTextLineHeight: typescaleTokens.labelLineHeight$sm,
  labelTextSize: typescaleTokens.labelSize$sm,
  labelTextLetterSpacing: typescaleTokens.labelLetterSpacing$sm,
  labelTextWeight: typescaleTokens.labelWeight$sm,
  // &:disabled
  labelTextColor$disabled: colorRolesTokens.onSurface,
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
