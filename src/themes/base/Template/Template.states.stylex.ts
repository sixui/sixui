import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import { IBasicTemplateStyleStateVarKey } from '@/components/atoms/Template/BasicTemplate';

const vars: IStyleVars<IBasicTemplateStyleStateVarKey> = {
  varA: 'unset',
};

export const componentVars = stylex.defineVars(vars);
