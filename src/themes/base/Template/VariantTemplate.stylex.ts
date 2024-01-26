import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ITemplateStyleVarKey } from '@/components/atoms/Template';
import { componentVars as baseComponentVars } from './Template.stylex';

const vars: Partial<IStyleVars<ITemplateStyleVarKey>> = {
  var1: '',
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
