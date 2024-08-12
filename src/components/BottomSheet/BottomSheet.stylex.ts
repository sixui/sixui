import stylex from '@stylexjs/stylex';

import { scaleTokens } from '~/themes/base/scale.stylex';

const vars = {
  // container
  containerMaxWidth: `calc(max(640px, calc(100% - 56px * 2)) * ${scaleTokens.scale})`,
  containerTopMargin: `calc(72px * ${scaleTokens.scale})`,
  containerInitialMaxHeight: '50vh',
};

export const bottomSheetTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const bottomSheetTheme = stylex.createTheme(bottomSheetTokens, vars);
