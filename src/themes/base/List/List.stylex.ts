import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IListStyleVarKey } from '@/components/atoms/List';

const vars: Partial<IStyleVars<IListStyleVarKey>> = {
  topSpace: '8px',
  bottomSpace: '8px',
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IListStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
