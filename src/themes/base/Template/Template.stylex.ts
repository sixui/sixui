import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ITemplateStyleVarKey } from '@/components/atoms/Template';

const vars: Partial<IStyleVars<ITemplateStyleVarKey>> = {
  var1: '',
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<ITemplateStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
