import stylex from '@stylexjs/stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

const vars = {
  // spacer
  spacer: spacingTokens.padding$6,

  // windowHorizontalSpace
  windowHorizontalSpace$compact: spacingTokens.padding$4,
  windowHorizontalSpace$medium: spacingTokens.padding$6,
  windowHorizontalSpace$expanded: spacingTokens.padding$6,
  windowHorizontalSpace$large: spacingTokens.padding$6,
  windowHorizontalSpace$extraLarge: spacingTokens.padding$6,
};

export const appLayoutListDetailBodyTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const appLayoutListDetailBodyTheme = stylex.createTheme(
  appLayoutListDetailBodyTokens,
  vars,
);
