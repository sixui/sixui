import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IPaperStyleVarKey } from '@/components/atoms/Paper';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { shapeVars } from '../vars/shape.stylex';

const vars: Partial<IStyleVars<IPaperStyleVarKey>> = {
  // container
  containerShape: shapeVars.corner$md,

  // outline
  outlineStyle: 'none',
  outlineColor: colorRolesVars.outlineVariant,
  outlineWidth: '1px',
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IPaperStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
