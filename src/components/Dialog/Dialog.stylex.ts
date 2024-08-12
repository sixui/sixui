import stylex from '@stylexjs/stylex';

import { scaleTokens } from '~/themes/base/scale.stylex';

const vars = {
  // container
  containerMinWidth: `calc(280px * ${scaleTokens.scale})`,
  containerMaxWidth: `calc(min(560px, calc(100% - 48px))  * ${scaleTokens.scale})`,
  containerMaxHeight: `calc(min(460px, calc(100% - 48px))  * ${scaleTokens.scale})`,
};

export const dialogTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const dialogTheme = stylex.createTheme(dialogTokens, vars);
