import stylex from '@stylexjs/stylex';

import { cardTokens } from '@/components/Card/Card.stylex';

const vars = {
  // container
  containerShape: cardTokens.containerShape,
};

export const cardMediaTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const cardMediaTheme = stylex.createTheme(cardMediaTokens, vars);
