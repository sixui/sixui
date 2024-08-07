import stylex from '@stylexjs/stylex';

const vars = {
  fixedHorizontalSpace: '24px',
  fixedHorizontalSpace$compact: '32px',
  fixedBottomSpace: '24px',
};

export const snackbarTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const snackbarTheme = stylex.createTheme(snackbarTokens, vars);
