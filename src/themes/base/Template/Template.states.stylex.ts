import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ITemplateStyleStateVarKey } from '@/components/atoms/Template';

const vars: IStyleVars<ITemplateStyleStateVarKey> = {
  varA: 'unset',
};

export const componentVars = stylex.defineVars(vars);
