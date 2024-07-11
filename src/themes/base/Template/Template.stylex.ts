import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IBasicTemplateStyleVarKey } from '@/components/atoms/Template/BasicTemplate';
import { colorRolesVars } from '../vars/colorRoles.stylex';

const vars: IStyleVars<IBasicTemplateStyleVarKey> = {
  textColor: colorRolesVars.onSurface,
};

export const componentVars = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
