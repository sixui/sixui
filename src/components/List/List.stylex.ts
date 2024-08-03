import stylex from '@stylexjs/stylex';

const vars = {
  topSpace: '8px',
  bottomSpace: '8px',
  gridSpace: '4px',
  itemSpace: '0',
};

export const listTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const listTheme = stylex.createTheme(listTokens, vars);
