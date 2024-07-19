import stylex from '@stylexjs/stylex';

const vars = {};

export const basicTemplateTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const basicTemplateTheme = stylex.createTheme(basicTemplateTokens, vars);
