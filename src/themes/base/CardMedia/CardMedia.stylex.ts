import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ICardMediaStyleVarKey } from '@/components/atoms/CardMedia';
import { componentVars as cardVars } from '../Card/Card.stylex';

const vars: Partial<IStyleVars<ICardMediaStyleVarKey>> = {
  // container
  containerShape: cardVars.containerShape,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<ICardMediaStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
