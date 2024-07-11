import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IVariableTemplateStyleVarKey } from '@/components/atoms/Template/VariableTemplate';
import { componentVars as baseComponentVars } from './Template.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

const vars: Partial<IStyleVars<IVariableTemplateStyleVarKey>> = {
  textColor: colorRolesVars.onSurfaceVariant,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
