import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ITemplateStyleVarKey } from '@/components/atoms/Template';
import { componentVars as baseComponentVars } from './Template.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

const vars: Partial<IStyleVars<ITemplateStyleVarKey>> = {
  textColor: colorRolesVars.onSurfaceVariant,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
